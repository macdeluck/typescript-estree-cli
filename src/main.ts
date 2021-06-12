#!/usr/bin/env node
import ts from "typescript";
import fs from 'fs';
import { TreeBuilder } from "./tree-builder";
import { ArgumentConfig, parse } from "ts-command-line-args";

interface IProgramArgv {
  sourcePath: string;
  outPath: string;
}

const config: ArgumentConfig<IProgramArgv> = {
  outPath: String,
  sourcePath: String
};

class Program {

  public run(argv: IProgramArgv): void {
    const content = fs.readFileSync(argv.sourcePath).toString();
    const treeBuilder = new TreeBuilder();
    
    const tsSourceCode = ts.createSourceFile(argv.sourcePath, content, ts.ScriptTarget.Latest, true);
    
    const eslintResult = treeBuilder.getAST(tsSourceCode);
    fs.writeFileSync(argv.outPath, JSON.stringify(eslintResult));
  }
}

const program = new Program();
program.run(parse<IProgramArgv>(config));