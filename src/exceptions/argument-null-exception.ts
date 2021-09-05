import { ArgumentException } from "./argument-exception";

export class ArgumentNullException extends ArgumentException {
  constructor(paramName: string) {
    super(paramName, `Value cannot be null. (Parameter '${paramName}')`);
  }
}
