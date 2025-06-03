import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../../../rest/types/validation-error-field.js';

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}
