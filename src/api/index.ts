import axios from 'axios'

class Api {
  static async getMdContent(name: string): Promise<string>{
    if (!name) {
      throw Error("md文件名不得为空")
    }
    name = name.replace(/-/g, '/') + ".md"
    const data = await axios.get(name)
    return data.data
  }


  /**
   *
   * 获取电子书目录
   * @static
   * @memberof Api
   */
  static async getCategory(){
    const data = await axios.get("SUMMARY.md")
    return data.data;
  }


  /**
   *
   * 获取词云数据
   * @static
   * @return {*}  {Promise<[string, number][]>}
   * @memberof Api
   */
  static async getWordCloud(): Promise<[string, number][]>{
    const data = await axios.get('/wordcloud.json')
    return data.data
  }
}

export default Api