import path from "path";
import { AstOutput } from "./ast-output";
import { FsUtil } from "./fsutil";

export interface OutputFileOptions {
  readonly outFile: string | null;
  readonly outDir: string | null;
  readonly printOutput: boolean | null;
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
      const outDir = this.options.outDir ?? path.dirname(output.sourceFileName);
      const outputPath = path.join(
        outDir,
        this.getOutputFileName(output));
      await this.writeFile(outputPath, [ output ]);
    } else {
      const allPromises = this.outputs.map(output => {
        const outDir = this.options.outDir ?? ".";
        const outputPath = path.join(
          outDir,
          path.dirname(output.sourceFileName),
          this.getOutputFileName(output));
        return this.writeFile(outputPath, [ output ]);
      });
      await Promise.all(allPromises);
    }
  }

  private getOutputFileName(output: AstOutput): string {
    return path.basename(output.sourceFileName, ".ts") + ".ts.json";
  }

  private async writeFile(filePath: string, outputs: AstOutput[]): Promise<void> {
    if (this.options.printOutput) {
      console.log(`typescript-estree-cli: Generated ${filePath}`);
    }

    if (!path.isAbsolute(filePath)) {
      filePath = path.join(process.cwd(), filePath);
    }

    if (!await FsUtil.exists(path.dirname(filePath))) {
      await FsUtil.createDir(path.dirname(filePath));
    }

    await FsUtil.truncateFile(filePath);
    await FsUtil.appendFile(filePath, JSON.stringify(outputs));
  }
}
