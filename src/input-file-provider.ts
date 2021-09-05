import { glob } from "glob";

export type InputFileHandler = (inputFile: string) => Promise<void>;

export class InputFileProvider {

  public async traverseFiles(pathOrGlobs: string[], handler: InputFileHandler): Promise<void> {
    const allPromises = pathOrGlobs.map(pathOrGlob => this.handleGlob(pathOrGlob, handler));
    await Promise.all(allPromises);
  }

  private async handleGlob(pathOrGlob: string, handler: InputFileHandler): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      glob.glob(pathOrGlob, (error, matches) => {
        if (error) {
          console.error(error);
        } else {
          this.handleFilesFound(matches, handler)
            .then(() => resolve())
            .catch(error => reject(error));
        }
      });
    });
  }

  private async handleFilesFound(paths: string[], handler: InputFileHandler): Promise<void> {
    const allPromises = paths.map(path => handler(path));
    await Promise.all(allPromises);
  }
}
