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

## Standalone executable downloads

Click [here](https://github.com/macdeluck/typescript-estree-cli/releases/latest) to get latest release.

## Example

Assuming having following `file.ts` file:

``` ts
class Test {}
```

tool can generate following `file.ast.json`

``` json
// Note: range and localization information is included in output but were removed from example below for readability
// Generated output is not pretty-formatted, it is rather single-line JSON
{
  "type": "Program",
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
  ],
  "sourceType": "script",
  "tokens": [
    {
      "type": "Keyword",
      "value": "class"
    },
    {
      "type": "Identifier",
      "value": "Test"
    },
    {
      "type": "Punctuator",
      "value": "{"
    },
    {
      "type": "Punctuator",
      "value": "}"
    }
  ],
  "comments": []
}
```

## Usage

### NPM package script

Add to `package.json` (scripts section):
``` json
{
  "scripts": {
    "build:ast": "typescript-estree-cli --sourcePath=path/to/your/file.ts --outPath=file.ast.json"
  }
}
```

And run with:
``` sh
npm run build:ast
```

### Using NodeJS
``` sh
node ./typescript-estree-cli.js --sourcePath=path/to/your/file.ts --outPath=file.ast.json
```

### Windows
``` pwsh
.\typescript-estree-cli.exe --sourcePath=path/to/your/file.ts --outPath=file.ast.json
```

### Linux
``` sh
./typescript-estree-cli --sourcePath=path/to/your/file.ts --outPath=file.ast.json
```

### MacOS
``` sh
./typescript-estree-cli --sourcePath=path/to/your/file.ts --outPath=file.ast.json
```