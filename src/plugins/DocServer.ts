
import {ViteDevServer} from 'vite'
import fs from 'fs'
import path from 'path'
import mime from 'mime'
import WordCloudService from '../build/WordCloudService'

let wordcloud: [string, number][] = []

export default function DocServer(){
  return {
    name: "doc-server",
    configureServer(server: ViteDevServer){
      // 处理doc目录下静态资源
      server.middlewares.use((req, res, next) => {
        if (req.originalUrl && req.originalUrl !== '/') {
          const uri = decodeURI(req.originalUrl)
          const fileUri = "./doc" + uri;
          if (!fs.existsSync(fileUri)){
            next()
            return
          }
          res.writeHead(200, { 'Content-Type': `${mime.getType(path.extname(uri))};charset=utf8` });
          res.write(fs.readFileSync(fileUri))
          res.end()
        }else{
          next()
        }
      })
      // 处理词云数据
      server.middlewares.use(async (req, res, next) => {
        if (req.originalUrl && req.originalUrl == '/wordcloud.json') {
          if (wordcloud.length == 0) {
            console.log('词云数据为空 生成')
            wordcloud = await WordCloudService.calcWordFrequency()
          }
          res.writeHead(200, { 'Content-Type': `application/json;charset=utf8` });
          res.write(JSON.stringify(wordcloud))
          res.end()
        }else{
          next()
        }
      })
    }
  }
}