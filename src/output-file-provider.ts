import path from "path";
import { AstOutput } from "./ast-output";
import { Guard } from "./exceptions/guard";
import { FsUtil } from "./fsutil";

export class OutputFileOptions {
  public readonly outFile: string | null;
  public readonly outDir: string | null;

  private constructor(outFile: string | null, outDir: string | null) {
    this.outFile = outFile;
    this.outDir = outDir;
  }

  public static forOutFile(outFile: string): OutputFileOptions {
    Guard.notEmpty(outFile, "outFile");

    return new OutputFileOptions(outFile, null);
  }

  public static forOutDir(outDir: string): OutputFileOptions {
    Guard.notEmpty(outDir, "outDir");

    return new OutputFileOptions(null, outDir);
  }
}

export class OutputFileProvider {
  private outputs: AstOutput[] = [];

  constructor(private readonly options: OutputFileOptions) {}

  public addOutput(output: AstOutput): void {
    this.outputs.push(output);
  }

  public async flush(): Promise<void> {
    if (this.options.outFile) {
      await this.writeFile(this.options.outFile, this.outputs);
    } else if (this.outputs.length == 1) {
      const output = this.outputs[0];
      const outputPath = path.join(this.options.outDir as string, this.getOutputFileName(output));
      await this.writeFile(outputPath, [ output ]);
    } else {
      const allPromises = this.outputs.map(output => {
        const outputPath = path.join(
          this.options.outDir as string,
          path.dirname(output.sourceFileName),
          this.getOutputFileName(output));
        return this.writeFile(outputPath, [ output ]);
      });
      await Promise.all(allPromises);
    }
  }

  private getOutputFileName(output: AstOutput): string {
    return path.basename(output.sourceFileName, ".ts") + ".json";
  }

  private async writeFile(filePath: string, outputs: AstOutput[]): Promise<void> {
    await FsUtil.truncateFile(filePath);
    await FsUtil.appendFile(filePath, JSON.stringify(outputs));
  }
}
