import * as cheerio from 'cheerio'
import fs from 'fs'
import { IAnalyzer } from './crowller'
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
export default class Analyzer implements IAnalyzer {
  //单例模式 不允许外部类里实例化该类（Analyzer）
  private static instance: Analyzer
  static getInstance() {
    if (!this.instance) {
      this.instance = new Analyzer()
    }
    return Analyzer.instance
  }

  private getCourseInfo(html: string) {
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
  //存到json文件里
  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      //读取已有文件内容
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data
    return fileContent
  }
  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseInfo, filePath)
    return JSON.stringify(fileContent)
  }
  private constructor() {}
}
