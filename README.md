# typescript-estree-cli
Cli tool for generating AST from typescript source files. Based on [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint#readme).

## Installation

``` sh
npm install --save-dev @macdeluck/typescript-estree-cli
```

or install as global tool:

``` sh
npm install -g @macdeluck/typescript-estree-cli
```

or use one of [standalone downloads](https://github.com/macdeluck/typescript-estree-cli/releases/latest).

## Example

Assuming having following `src/file.ts` file:

``` ts
class Test {}
```

tool can generate following `file.ts.json`

``` json
// Note: Generated output is not pretty-formatted, it is rather single-line JSON
[
  {
    "sourceFileName": "src/file.ts",
    "body": [
      {
        "type": "ClassDeclaration",
        "id": {
          "type": "Identifier",
          "name": "Test"
        },
        "body": {
          "type": "ClassBody",
          "body": []
        },
        "superClass": null
      }
    ]
  }
]
```

## Scenarios

Generating AST for single file (or multiple files)

``` sh
typescript-estree-cli path/to/your/file.ts
typescript-estree-cli path/to/your/file1.ts path/to/your/file2.ts
```

Generating AST for all files `*.ts` from `src` directory and subdirectories
``` sh
typescript-estree-cli src/**/*.ts
```

Options
* `--outFile` - output all AST to specific file
* `--outDir` - output AST to specific dir
* `--printOutput` - prints generated file names to standard output

## Usage

**NPM global tool**

``` sh
typescript-estree-cli path/to/your/file.ts --outFile=file.ts.json
```

**NPM package script**

Add to `package.json` (scripts section):
``` json
{
  "scripts": {
    "build:ast": "typescript-estree-cli path/to/your/file.ts --outFile=file.ts.json"
  }
}
```

And run with:
``` sh
npm run build:ast
```

**Using NodeJS**
``` sh
node ./typescript-estree-cli.js path/to/your/file.ts --outDir=file.ast.json
```

**Windows**
``` pwsh
.\typescript-estree-cli.exe path/to/your/file.ts --outDir=file.ast.json
```

**Linux**
``` sh
./typescript-estree-cli path/to/your/file.ts --outDir=file.ast.json
```

**MacOS**
``` sh
./typescript-estree-cli path/to/your/file.ts --outDir=file.ast.json
```