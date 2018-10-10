import { LoadingProgrammatic } from 'buefy';
import { LoadingConfig } from 'buefy/types/components';

export default class LoadUtil {
    public static async loading(
            loading: typeof LoadingProgrammatic,
            func: () => any, loadingConfig: LoadingConfig = {}) {
        const load = loading.open(loadingConfig);
        try {
            await func();
        } finally {
            load.close();
        }
    }

    protected constructor() {}
}
