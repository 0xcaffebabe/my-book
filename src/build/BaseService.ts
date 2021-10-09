import fs from 'fs'
import path from 'path'

const ignorePrefixs = ['.git', 'node_modules', 'dist']

export default class BaseService {

  static listAllFile(path: string): string[] {
    for(let i of ignorePrefixs) {
      if (path.startsWith(i)) {
        return []
      }
    }
    const result = []
    for(let item of fs.readdirSync(path)){
      if (!path.startsWith('./')) {
        item = path + "/" + item
      }
      if (fs.lstatSync(item).isDirectory()){
        result.push(...BaseService.listAllFile(item))
      }else{
        result.push(item)
      }
    }
    return result
  }

  static listFilesBySuffix(suffix: string): string[] {
    return BaseService.listAllFile("./")
                      .filter(v => v.endsWith('.' + suffix) || v.endsWith('.' + suffix.toUpperCase()))
  }

  static listAllMdFile(): string[] {
    return BaseService.listFilesBySuffix('md')
  }

}