import marked from 'marked'
import api from '@/api'
import Category from '@/dto/Category'


class CategoryService {

  public static async getCategoryList() : Promise<Category[]>{
    const rawData = await api.getCategory()
    const html = marked(rawData)
    return CategoryService.categoryParse(html)
  }

  private static categoryParse(html: string): Category[]{
    const elm = new DOMParser().parseFromString(html, 'text/html')
    const topCate = elm.querySelectorAll('body > ul > li')
    const categoryList: Category[] = []
    for(let i = 0;i<topCate.length;i++){
      categoryList.push(CategoryService.resolveCategory(topCate[i]))
    }
    return categoryList
  }

  private static resolveCategory(cate: Element): Category {
    const category = new Category()
    category.name = cate.querySelector('a')?.innerText!
    category.link = cate.querySelector('a')?.getAttribute("href")!
    const children = cate.querySelector("ul")?.querySelectorAll(':scope > li')
    if (!children) {
      return category
    }
    for(let i = 0;i<children.length;i++){
      category.chidren.push(CategoryService.resolveCategory(children[i]))
    }
    return category
  }
}

export default CategoryService