import api from '@/api'
import marked from 'marked'
import prism from 'prismjs'
import Content from '@/dto/Content'

class DocService {

  static renderMd(mdContent: string) : string {
    return marked(mdContent)
  }

  static hightlightCode(code: string): string {
    return prism.highlight(code, prism.languages.js, 'js')
  }

  public static docUrl2Id(url :string): string {
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
  static getContent(docHtml: string): Content[] {
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

export default DocService