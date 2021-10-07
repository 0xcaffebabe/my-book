import axios from 'axios'

class Api {
  static async getMdContent(name: string){
    if (!name) {
      throw Error("md文件名不得为空")
    }
    name = "doc/" + name.replace(/-/g, '/') + ".md"
    const data = await axios.get(name)
    return data.data
  }
}

export default Api