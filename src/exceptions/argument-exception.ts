import { Exception } from "./exception";

export class ArgumentException extends Exception {
  public readonly paramName: string;

  constructor(paramName: string, message: string) {
    super(message);
    this.paramName = paramName;
  }
}
