import { Logger } from './logger';
import { _DEV_ } from '../utils';

const getErrorMessage = (error: unknown) => {
  if (_DEV_) {
    console.error('In the function "getErrorMessage" in DEV branch:', error);
  } else {
    let message;

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = `In the function "getErrorMessage" the error message: ${error}`;
    }

    console.error(
      `Acuity Error! The function "getErrorMessage" does not consider instances of this data type: ${error}`,
    );
    Logger.notify(message);
  }
};

type ErrorHandling = (...args: unknown[]) => void;
export const errorHandling: ErrorHandling = (...args) => {
  const errors: Array<unknown> = args.filter(Boolean);

  if (!errors.length) return;

  errors.forEach((error: unknown) => {
    getErrorMessage(error);
  });
};
