import { ResolvedConfig } from "vite"
import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import rimraf from 'rimraf'

export default function DocBuildMove(){
  let config : ResolvedConfig;
  return {
    name: "doc-build-move",
    async configResolved(rconfig: ResolvedConfig) {
      config = rconfig
    },
    buildStart(options: any) {
      // build 模式移动doc目录
      if (config.command == 'build') {
        console.log("doc-build-move 清空outDir")
        rimraf.sync(config.build.outDir + "/*")
        shell.mkdir(config.build.outDir)
        console.log("doc-build-move 移动doc目录")
        shell.cp("-R", "doc/*","./" + config.build.outDir)
      }
    }
  }
}