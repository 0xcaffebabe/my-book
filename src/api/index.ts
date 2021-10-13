import axios from 'axios'
import DocFileInfo from '@/dto/DocFileInfo'
import Cache from '@/decorator/Cache'
import Cacheable from '@/decorator/Cacheable'

const cache = Cache()

class Api implements Cacheable{
  private static instance :Api
  public name(): string {
    return 'api'
  }

  private constructor(){}

  @cache
  public async getDocFileInfo(name: string): Promise<DocFileInfo>{
    if (!name) {
      throw Error("doc文件名不得为空")
    }
    name = "/" + name.replace(/-/g, '/') + ".md.json"
    const data = await axios.get(name)
    return data.data
  }


  /**
   *
   * 获取电子书目录
   * @static
   * @memberof Api
   */
  public async getCategory(){
    const data = await axios.get("/SUMMARY.md")
    return data.data;
  }


  /**
   *
   * 获取词云数据
   * @static
   * @return {*}  {Promise<[string, number][]>}
   * @memberof Api
   */
  public async getWordCloud(): Promise<[string, number][]>{
    const data = await axios.get('/wordcloud.json')
    return data.data
  }

  public static getInstance(){
    if (!this.instance) {
      this.instance = new Api()
    }
    return this.instance;
  }
}

export default Api.getInstance()