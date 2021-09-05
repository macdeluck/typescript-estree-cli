import { ArgumentException } from "./argument-exception";

export class ArgumentEmptyException extends ArgumentException {
  constructor(paramName: string) {
    super(paramName, `Value cannot be null or empty. (Parameter '${paramName}')`);
    this.name = 'ArgumentEmptyException';
  }
}
