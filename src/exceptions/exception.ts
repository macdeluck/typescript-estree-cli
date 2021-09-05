export class Exception extends Error {
  public readonly message: string;

  public constructor(message: string) {
    super();
    this.name = 'Exception';
    this.message = message;
  }
}
