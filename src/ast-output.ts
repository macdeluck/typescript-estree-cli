import { TSESTree } from "@typescript-eslint/typescript-estree";

export interface AstOutput {
  readonly sourceFileName: string;
  readonly body: TSESTree.ProgramStatement[];
}
