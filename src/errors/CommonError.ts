import ExtendableError from '@/errors/ExtendableError';

export default class CommonError extends ExtendableError<any> {
    public constructor(message: string, extra: any = {}) {
        super(message, extra);
    }
}
