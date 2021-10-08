import api from '@/api'
import marked from 'marked'

class DocService {
  static async getDocHtml(doc: string): Promise<string> {
    const md = await api.getMdContent(doc)
    const html = marked(md)
    return html
  }
}

export default DocService