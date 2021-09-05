import { TSESTree } from "@typescript-eslint/typescript-estree";

export interface AstOutput {
  readonly sourceFileName: string;
  readonly tree: TSESTree.Program;
}
