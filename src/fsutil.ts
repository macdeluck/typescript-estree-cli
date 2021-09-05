import { glob as globfnc } from "glob";
import * as fslib from "fs";

export const FsUtil = {
  exists: function (path: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      fslib.stat(path, function(err, stat) {
        if (err == null) {
          resolve(true);
        } else if(err.code === 'ENOENT') {
          resolve(false);
        } else {
          reject(err);
        }
      });
    });
  },
  
  glob: function (pattern: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      globfnc(pattern, (error, matches) => {
        if (error) {
          reject(error);
        } else {
          resolve(matches);
        }
      });
    });
  },

  truncateFile: function (path: string): Promise<void> {
    return new Promise<void>((resolve) => {
      fslib.truncate(path, () => resolve());
    });
  },

  appendFile: function (path: string, contents: string): Promise<void> {
    return new Promise<void>((resolve) => {
      fslib.appendFile(path, contents, { encoding: 'utf-8' }, () => resolve());
    });
  }
}