import DocFileInfo from "@/dto/DocFileInfo";
import BaseService from "./BaseService";
import GitService from "./GitService";
import fs from 'fs'

class DocService extends BaseService {

  static async getFileInfo(path: string): Promise<DocFileInfo> {
    const callResult = await Promise.all([GitService.getFileCommitList(path), fs.promises.readFile(path)])
    return {
      content: callResult[1].toString(),
      commitList: callResult[0]
    } as DocFileInfo
  }
}

export default DocService