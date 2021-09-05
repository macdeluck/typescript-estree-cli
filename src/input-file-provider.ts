import { glob } from "glob";
import { FsUtil } from "./fsutil";

export type InputFileHandler = (inputFile: string) => Promise<void>;

export class InputFileProvider {

  public async traverseFiles(pathOrGlobs: string[], handler: InputFileHandler): Promise<void> {
    const allPromises = pathOrGlobs.map(pathOrGlob => this.handleGlob(pathOrGlob, handler));
    await Promise.all(allPromises);
  }

  private async handleGlob(pathOrGlob: string, handler: InputFileHandler): Promise<void> {
    const matches = await FsUtil.glob(pathOrGlob);
    await this.handleFilesFound(matches, handler);
  }

  private async handleFilesFound(paths: string[], handler: InputFileHandler): Promise<void> {
    const allPromises = paths.map(path => handler(path));
    await Promise.all(allPromises);
  }
}
