import BaseService from "./BaseService";
import CommitInfo from '../dto/CommitInfo'
import simpleGit, {SimpleGit} from 'simple-git';
const git: SimpleGit = simpleGit();

class GitService extends BaseService {

  static async getFileCommitList(path: string): Promise<CommitInfo[]> {
    const resp = await git.log({
      file :path
    })
    return resp.all.map(v => {
      return {
        date: v.date,
        author: v.author_name,
        message: v.message,
        hash: v.hash
      } as CommitInfo
    })
  }
}

export default GitService