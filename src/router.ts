import { Router, Request, Response, NextFunction } from 'express'
import path from 'path'
import fs from 'fs'
import Crowller from './utils/crowller'
import Analyzer from './utils/analyzer'
import { getResponseData } from './utils/util'

interface typeWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : undefined
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
  }
}
const router = Router()
router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : undefined
  if (isLogin) {
    res.send(
      `<body>
        <a href='/getData'>爬取内容</a>
        <a href='/showData'>展示内容</a>
        <a href='/logout'>退出</a>
      </body>`
    )
  } else {
    res.send(
      `<body>
      <form action='login' method='post'>
      <input type='password' name='password'/>
      <button>提交</button>
      </form>
      </body>`
    )
  }
})
//登录
router.post('/login', (req: typeWithBody, res: Response) => {
  const isLogin = req.session ? req.session.login : undefined
  if (isLogin) {
    res.json(getResponseData(null, '已经登录'))
  } else {
    if (req.session && req.body.password === '123') {
      req.session.login = true
      res.json(getResponseData(true))
    } else {
      res.json(getResponseData(null, 'getData error'))
    }
  }
})
//退出
router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }
  res.json(getResponseData(true))
})

router.get('/getData', checkLogin, (req: typeWithBody, res: Response) => {
  const secretKey = 'x3b174jsx'
  const url = `http://www.dell-lee.com/typescript/demo.html?secrect=${secretKey}`
  const analyzer = Analyzer.getInstance()
  new Crowller(analyzer, url)
})
router.get('/showData', checkLogin, (req: typeWithBody, res: Response) => {
  try {
    const position = path.resolve(__dirname, '../data/course.json')
    const result = fs.readFileSync(position, 'utf8')
    const jsonObj = JSON.parse(result)
    res.json(getResponseData(jsonObj))
  } catch (error) {
    res.json(getResponseData(null, '文件不存在'))
  }
})

export default router
