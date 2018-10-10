import * as Exif from 'exif-js';

/**
 * need
 * img {
 *     image-orientation: none !important;
 * }
 */
export default class ImgUtil {
    /**
     * Imageをロード
     * @param url
     */
    public static async loadImg(url: string) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.onerror = () => {
                reject();
            };

            image.src = url;
        });
    }

    /**
     * Exif情報から角度IDを取得
     * @param img
     */
    public static async getOrientation(img: HTMLImageElement) {
        return new Promise<number>((resolve, reject) => {
            Exif.getData(img as any, () => {
                const orientation = Exif.getTag(img, 'Orientation');
                resolve(orientation || 1);
            });
        });
    }

    /**
     * Exif情報から撮影時の角度を取得
     * @param img
     */
    public static async getRotateFromExif(img: HTMLImageElement) {
        const orientation = await this.getOrientation(img);
        switch (orientation) {
            case 1:
            case 2:
                return 0;
            case 3:
            case 4:
                return 180;
            case 5:
            case 6:
                return 90;
            case 7:
            case 9:
                return 270;
            default:
                return 0;
        }
    }

    /**
     * Exif情報から画像を回転
     * @param img
     */
    public static async rotateFromExif(img: HTMLImageElement) {
        Exif.getData(img as any, () => {
            Exif.getTag(img, 'Orientation');
        });

        const rotate = await this.getRotateFromExif(img);
        const canvas = document.createElement('canvas');
        if (rotate === 90 || rotate === 270) {
            // 90度回転時は縦横が入れ替わる
            canvas.width = img.naturalHeight;
            canvas.height = img.naturalWidth;
        } else {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
        }

        const context = canvas.getContext('2d')!;
        context.rotate(rotate * Math.PI / 180);

        // offset
        if (rotate === 90) {
            context.translate(0, -img.naturalHeight);
        } else if (rotate === 180) {
            context.translate(-img.naturalWidth, -img.naturalHeight);
        } else if (rotate === 270) {
            context.translate(-img.naturalWidth, 0);
        }

        // draw
        context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
        img.src = canvas.toDataURL();
        return img;
    }

    protected constructor() {}
}
