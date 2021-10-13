import marked from 'marked'
import api from '@/api'
import Category from '@/dto/Category'


class CategoryService {

  private static instance : CategoryService

  private constructor(){}

  public static getInstance(){
    if (!this.instance) {
      this.instance = new CategoryService()
    }
    return this.instance
  }

  public async getCategoryList() : Promise<Category[]>{
    const rawData = await api.getCategory()
    const html = marked(rawData)
    return this.categoryParse(html)
  }

  public docUrl2Id(url :string): string {
    if (!url) {
      return ""
    }
    url = decodeURI(url)
    return url.split('/').splice(1).join('-').replace('.md', '')
  }

  private categoryParse(html: string): Category[]{
    const elm = new DOMParser().parseFromString(html, 'text/html')
    const topCate = elm.querySelectorAll('body > ul > li')
    const categoryList: Category[] = []
    for(let i = 0;i<topCate.length;i++){
      categoryList.push(this.resolveCategory(topCate[i]))
    }
    return categoryList
  }

  private resolveCategory(cate: Element): Category {
    const category = new Category()
    category.name = cate.querySelector('a')?.innerText!
    category.link = cate.querySelector('a')?.getAttribute("href")!
    const children = cate.querySelector("ul")?.querySelectorAll(':scope > li')
    if (!children) {
      return category
    }
    for(let i = 0;i<children.length;i++){
      category.chidren.push(this.resolveCategory(children[i]))
    }
    return category
  }
}

export default CategoryService.getInstance()