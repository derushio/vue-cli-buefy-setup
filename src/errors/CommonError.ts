import ExtendableError from '@/errors/ExtendableError';

export class CommonError extends ExtendableError<any> {
    public constructor(message: string, extra: any = {}) {
        super(message, extra);
    }
}
