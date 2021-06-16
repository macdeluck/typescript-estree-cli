import ts from "typescript";
import fs from 'fs';
import { TreeBuilder } from "./tree-builder";
import { ArgumentConfig, parse } from "ts-command-line-args";

export interface IProgramArgv {
  sourcePath: string;
  outPath: string;
}

export const config: ArgumentConfig<IProgramArgv> = {
  outPath: String,
  sourcePath: String
};

export class TypescriptEstreeCliProgram {

  public run(argv: IProgramArgv): void {
    const content = fs.readFileSync(argv.sourcePath).toString();
    const treeBuilder = new TreeBuilder();
    
    const tsSourceCode = ts.createSourceFile(argv.sourcePath, content, ts.ScriptTarget.Latest, true);
    
    const eslintResult = treeBuilder.getAST(tsSourceCode);
    fs.writeFileSync(argv.outPath, JSON.stringify(eslintResult));
  }
}

export function run() {
  const program = new TypescriptEstreeCliProgram();
  program.run(parse<IProgramArgv>(config));
}