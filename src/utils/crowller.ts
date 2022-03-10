//ts -> d.ts -> js
import path from 'path'
import superagent from 'superagent'
import fs from 'fs'

export interface IAnalyzer {
  analyze: (html: string, filePath: string) => string
}
class Crowller {
  private filePath = path.resolve(__dirname, '../../data/course.json')
  private async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  private async initPriderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath) //写文件
    this.writeFile(fileContent)
  }
  constructor(private analyzer: any, private url: string) {
    this.initPriderProcess()
  }
}

// const secretKey = 'x3b174jsx'
// const url = `http://www.dell-lee.com/typescript/demo.html?secrect=${secretKey}`
// const analyzer = DellAnalyzer.getInstance()
// new Crowller(analyzer, url)

export default Crowller
