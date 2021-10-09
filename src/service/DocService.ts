import api from '@/api'
import marked from 'marked'
import prism from 'prismjs'

class DocService {
  static async getDocHtml(doc: string): Promise<string> {
    const md = await api.getMdContent(doc)
    const html = marked(md)
    return html
  }

  static hightlightCode(code: string): string {
    return prism.highlight(code, prism.languages.js, 'js')
  }
}

export default DocService