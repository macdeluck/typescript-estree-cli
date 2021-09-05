import ts from "typescript";
import fs from "fs";
import { TreeBuilder } from "./tree-builder";
import { ArgumentConfig, parse } from "ts-command-line-args";
import { InputFileProvider } from "./input-file-provider";
import { ArgumentException } from "./exceptions/argument-exception";
import { OutputFileOptions, OutputFileProvider } from "./output-file-provider";
import { AstOutput } from "./ast-output";

export interface IProgramArgv {
  outFile: string;
  outDir: string;
  source: string[];
}

export const config = {
  outFile: { type: String, optional: true },
  outDir: { type: String, optional: true },
  source: { type: String, multiple: true, defaultOption: true, defaultValue: [], optional: true }
} as ArgumentConfig<IProgramArgv>;

export class TypescriptEstreeCliProgram {
  private readonly treeBuilder = new TreeBuilder();

  public async run(argv: IProgramArgv): Promise<void> {
    this.validateArgv(argv);

    if (!argv.outFile && !argv.outDir) {
      argv.outDir = ".";
    }

    const outputFileOptions = argv.outFile
      ? OutputFileOptions.forOutFile(argv.outFile)
      : OutputFileOptions.forOutDir(argv.outDir);

    const outputFileProvider = new OutputFileProvider(outputFileOptions);
    const inputFileProvider = new InputFileProvider();

    await inputFileProvider.traverseFiles(argv.source, async (fileName: string) => {
      const astOutput = this.processSourceFile(fileName);
      outputFileProvider.addOutput(astOutput);
    });

    await outputFileProvider.flush();
  }

  private processSourceFile(fileName: string): AstOutput {
    const content = fs.readFileSync(fileName).toString();
    const tsSourceCode = ts.createSourceFile(fileName, content, ts.ScriptTarget.Latest, true);
    const eslintResult = this.treeBuilder.getAST(tsSourceCode);
    return {
      sourceFileName: fileName,
      tree: eslintResult
    };
  }

  private validateArgv(argv: IProgramArgv) {
    if (!argv.source) {
      throw new ArgumentException("argv", "No source files have been provided.");
    }

    if (argv.outFile && argv.outDir) {
      throw new ArgumentException("argv", "Both 'outFile' and 'outDir' parameters cannot be provided in the same time.");
    }
  }
}

export function run(): void {
  const program = new TypescriptEstreeCliProgram();
  program.run(parse<IProgramArgv>(config)).then(() => {console.log("Done")});
}
