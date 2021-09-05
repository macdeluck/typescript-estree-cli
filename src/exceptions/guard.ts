import { ArgumentEmptyException } from "./argument-empty-exception";

export class Guard {
  private constructor() {}

  public static notEmpty(parameter: any | null | undefined, parameterName: string): void {
    if (parameter == null || parameter == undefined) {
      throw new ArgumentEmptyException(parameterName);
    }
  }
}
