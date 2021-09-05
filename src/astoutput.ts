import * as path from "path";
import { FsUtil } from "./fsutil";

export interface AstOutputOptions {
  outFile: string | null;
  outDir: string | null;
}

export class AstOutput {
  private options: AstOutputOptions = {
    outDir: '',
    outFile: ''
  };

  constructor(options: AstOutputOptions) {
    Object.assign(this.options, options);

    if (this.options.outFile && this.options.outDir) {
      console.warn("Both outFile and outDir provided. Forcing output to file.");
      this.options.outDir = null;
    }
  }

  public async init(): Promise<void> {
    if (this.options.outFile && await FsUtil.exists(this.options.outFile)) {
      await FsUtil.truncateFile(this.options.outFile);
    }
  }

  public async addContent(sourcePath: string, contents: string): Promise<void> {
    const relativeSourcePath = path.relative('.', sourcePath);
    const relativeOutputPath = relativeSourcePath + '.ast';
    let outputPath = null;
    if (this.options.outDir) {
      outputPath = path.join(this.options.outDir, relativeOutputPath);
    } else if (this.options.outFile) {
      outputPath = this.options.outFile;
    } else {
      outputPath = path.join('.', relativeOutputPath);
    }

    if (!this.options.outFile) {
      await FsUtil.truncateFile(outputPath);
    }

    await FsUtil.appendFile(outputPath, contents);
  }
}