import { ValidationErrorField } from '../../../rest/types/validation-error-field.js';
import { ApplicationError } from '../../../rest/types/application-error.js';

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return { errorType, error, details };
}
