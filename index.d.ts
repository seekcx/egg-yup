import { Context } from 'egg';
import yup, { ValidateOptions, LocaleObject } from 'yup';

declare module 'egg' {
  interface Application {
    yup: typeof yup;
    setYupLocale: (locale: string | LocaleObject) => void;
  }

  interface Context {
    validate: (rules: any, values?: any, options?: ValidateOptions) => Promise<ValidationError | any>;
    validateSync: (rules: any, values?: any, options?: ValidateOptions) => ValidationError | any;
  }

  interface EggAppConfig {
    yup: {
      locale: string | null;
      locales: {
        [localeName: string]: LocaleObject;
      },
      onerror: ((err: ValidationError, ctx: Context) => void) | null,
      options: ValidateOptions
    }
  }
}
