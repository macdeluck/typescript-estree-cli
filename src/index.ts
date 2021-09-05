import ts from "typescript";
import fs from 'fs';
import { TreeBuilder } from "./tree-builder";
import { ArgumentConfig, CommandLineOption, OptionalPropertyOptions, parse } from "ts-command-line-args";
import { AstOutput } from "./astoutput";

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

  public async run(argv: IProgramArgv): Promise<void> {
    const astOutput = new AstOutput({
      outDir: argv.outDir,
      outFile: argv.outFile
    });
    const content = fs.readFileSync(argv.source[0]).toString();

    if (argv.source && argv.source.length > 1) {

    }
    const treeBuilder = new TreeBuilder();
    
    const tsSourceCode = ts.createSourceFile(argv.source[0], content, ts.ScriptTarget.Latest, true);
    
    const eslintResult = treeBuilder.getAST(tsSourceCode);
    fs.writeFileSync(argv.outFile, JSON.stringify(eslintResult));

    await astOutput.flush();
  }
}

export function run(): void {
  const program = new TypescriptEstreeCliProgram();
  program.run(parse<IProgramArgv>(config)).then(() => {console.log("Done")});
}