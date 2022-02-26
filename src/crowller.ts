//ts -> d.ts -> js
import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import * as cheerio from 'cheerio'
interface CourseInfo {
  title: string
  count: number
}
interface CourseResult {
  time: number
  data: CourseInfo[]
}
interface Content {
  [propName: number]: CourseInfo[]
}
class Crowller {
  private secretKey = 'x3b174jsx'
  private filePath = path.resolve(__dirname, '../data/course.json')
  private url = `http://www.dell-lee.com/typescript/demo.html?secrect=${this.secretKey}`
  getCourseInfo(html: string) {
    const courseInfo: CourseInfo[] = []
    const $ = cheerio.load(html)
    const courseItems = $('.course-item')
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      const count = parseInt(descs.eq(1).text().split('：')[1], 10)
      courseInfo.push({ title, count })
    })
    return {
      time: new Date().getTime(),
      data: courseInfo,
    }
  }

  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }
  //存到json文件里
  generateJsonContent(courseInfo: CourseResult) {
    const fileContent: Content = {}
    if (fs.existsSync(this.filePath)) {
      let fileContent = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data
    return fileContent
  }

  async initPriderProcess() {
    const html = await this.getRawHtml()
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseInfo)
    //写文件
    fs.writeFileSync(this.filePath, JSON.stringify(fileContent))
  }
  constructor() {
    this.initPriderProcess()
  }
}
const crowller = new Crowller()
