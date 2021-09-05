import ts from "typescript";
import { Extra } from "@typescript-eslint/typescript-estree/dist/parser-options";
import { astConverter } from "@typescript-eslint/typescript-estree/dist/ast-converter";
import { TSESTree } from "@typescript-eslint/typescript-estree";

export class TreeBuilder {

  public getASTBody(tsSourceCode: ts.SourceFile): TSESTree.ProgramStatement[] {
    const code = tsSourceCode.getFullText();
  
    // Create options for converter
    const extra = this.initExtra();
  
    // They're needed to pass the converter result to eslint's SourceCode
    extra.tokens = [];
    extra.comment = true;
    extra.comments = [];
    extra.code = code;
  
    // Convert from TypeScript AST to estree AST
    const { estree } = astConverter(tsSourceCode, extra, false);
  
    return estree.body;
  }

  private initExtra(): Extra {
    return {
      code: "",
      comment: false,
      comments: [],
      createDefaultProgram: false,
      debugLevel: new Set<any>(),
      errorOnTypeScriptSyntacticAndSemanticIssues: false,
      errorOnUnknownASTType: false,
      EXPERIMENTAL_useSourceOfProjectReferenceRedirect: false,
      extraFileExtensions: [],
      filePath: "",
      jsx: false,
      loc: false,
      log: console.log,
      preserveNodeMaps: undefined,
      projects: [],
      range: false,
      strict: false,
      tokens: null,
      tsconfigRootDir: ".",
      useJSXTextNode: false
    };
  }
}