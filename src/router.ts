import { Router, Request, Response } from 'express'
import Crowller from './crowller'
import DellAnalyzer from './dellAnalyzer'

interface typeWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}
const router = Router()
router.get('/', (req: Request, res: Response) => {
  res.send(
    `<body>
    <form action='getData' method='post'>
    <input type='password' name='password'/>
    <button>提交</button>
    </form>
    </body>`
  )
})

router.post('/getData', (req: typeWithBody, res: Response) => {
  if (req.body.password === '123') {
    const secretKey = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secrect=${secretKey}`
    const analyzer = DellAnalyzer.getInstance()
    new Crowller(analyzer, url)
    res.send('getData success')
  } else {
    res.send(`${req.body.name} getData error`)
  }
})

export default router
