/* tslint:disable:no-console */

export enum ConsoleLevel {
    error, assert, log, info,
}

export default class ConsoleUtil {
    public static consoleLevel = (process.env.NODE_ENV === 'develop')
        ? ConsoleLevel.info : ConsoleLevel.error;

    public static info(message?: any, ...optionalParams: any) {
        if (this.consoleLevel <= ConsoleLevel.info) {
            console.info(message, ...optionalParams);
        }
    }

    public static log(message?: any, ...optionalParams: any) {
        if (this.consoleLevel <= ConsoleLevel.log) {
            console.log(message, ...optionalParams);
        }
    }

    public static table(tabularData: any, properties?: string) {
        if (this.consoleLevel <= ConsoleLevel.log) {
            console.table(tabularData, properties);
        }
    }

    public static assert(value?: any, message?: string, ...optionalParams: any) {
        if (this.consoleLevel <= ConsoleLevel.assert) {
            console.assert(value, message, ...optionalParams);
        }
    }

    public static error(message?: any, ...optionalParams: any) {
        if (this.consoleLevel <= ConsoleLevel.error) {
            console.error(message, ...optionalParams);
        }
    }
}
