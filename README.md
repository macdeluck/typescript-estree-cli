# typescript-estree-cli
Cli tool for generating AST from typescript source files

## Usage
### Windows
``` pwsh
.\typescript-estree-cli-win.exe --sourcePath=path/to/your/file.ts --outPath=file.ast.json
```

### Linux
``` sh
./typescript-estree-cli-linux --sourcePath=path/to/your/file.ts --outPath=file.ast.json
```

### MacOS
``` sh
./typescript-estree-cli-macos --sourcePath=path/to/your/file.ts --outPath=file.ast.json
```

### Raw NodeJS
Assuming extract distribution to typescript-estree-cli directory:
``` sh
node ./typescript-estree-cli/main.js --sourcePath=path/to/your/file.ts --outPath=file.ast.json
```