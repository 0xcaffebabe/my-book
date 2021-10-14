import api from '@/api'
import marked from 'marked'
import prism from 'prismjs'
import Content from '@/dto/Content'
import Cacheable from '@/decorator/Cacheable'
import Cache from '@/decorator/Cache'
const cache = Cache()

const LANGUAGE_MAP = {
  'c': 'clike',
  'java': 'clike',
  'cpp': 'clike',
  'c++': 'clike',
  'html': 'markup',
  'xml': 'markup',
  'python': 'clike',
  'c#': 'clike',
  'ts': 'javascript',
  'js': 'javascript',
  'typesscript': 'javascript',
  'go': 'clike',
  'conf': 'markup',
  'ruby': 'clike',
} as Record<string, string>

class DocService implements Cacheable{

  private static instance: DocService

  private constructor(){}

  name(): string {
    return 'doc-service'
  }

  public static getInstance(): DocService {
    if (!this.instance) {
      this.instance = new DocService()
    }
    return this.instance
  }

  @cache
  public renderMd(mdContent: string) : string {
    const render = new marked.Renderer()
    // 自定义url渲染
    render.link = (href: string | null, title: string | null, text: string | null) : string => {
      if (!href?.startsWith('http')) {
        return `<a href='/doc/${this.docUrl2Id(href!)}'>${text}</a>`
      }else {
        return `<a href='${href}' target="_blank">${text}</a>`
      }
    }
    // 自定义代码块渲染
    render.code = (code: string, language: string | undefined, isEscaped: boolean) :string => {
      return `<pre><code class="language-${language}">${this.hightlightCode(code, language)}</code></pre>`
    }
    // 自定义图片渲染
    render.image = (href: string | null, title: string | null, text: string): string => {
      return `<p class="img-wrapper" style="text-align:center"><img src='${href}'/></p>`
    }
    return  marked(mdContent, {
      renderer: render
    })
  }

  private hightlightCode(code: string, lang: string | undefined): string {
    if (!lang) {
      lang = 'clike'
    }else {
      if (LANGUAGE_MAP[lang]) {
        lang = LANGUAGE_MAP[lang]
      }else {
        lang = 'clike'
      }
    }
    return prism.highlight(code, prism.languages[lang], lang)
  }

  public docUrl2Id(url :string): string {
    if (!url) {
      return ""
    }
    url = decodeURI(url)
    return url.split('/').splice(1).join('-').replace('.md', '')
  }


  /**
   *
   * 根据文档html生成目录
   * @static
   * @param {string} docHtml
   * @return {*}  {Promise<Content[]>}
   * @memberof DocService
   */
  @cache
  public getContent(docHtml: string): Content[] {
    const elm = new DOMParser().parseFromString(docHtml, 'text/html')
    const allHead = elm.querySelectorAll('h1, h2, h3, h4, h5, h6')
    // 用来存储最近的Hx节点
    /* 
      算法概要：
      获取所有h1 - h6 节点
      每次迭代将dom元素转为Content类 并将转换后的对象存储到contentMap（key: level, value: content）里
      除了顶级目录 其他目录每次都会通过ContentMap找寻其最近的一个父节点 并将自己添加到父节点的孩子列表
    */
    let contentMap = []
    let result : Content[] = []
    for(let i = 0;i<allHead.length;i++){
      const head = allHead[i]
      let level = parseInt(head.tagName.replace('H', ''))
      let content = new Content()
      content.name = head.innerHTML
      content.link = head.getAttribute("id")!
      contentMap[level] = content
      if (level == 1) {
        result.push(content)
      }else {
        for(let i = level - 1;i >= 1; i--) {
          if (contentMap[i]) {
            contentMap[i].chidren.push(content)
            break
          }
        }
      }
    }
    return result
  }
}

export default DocService.getInstance()