import express, { Request, Response, NextFunction } from 'express'
import router from './router'
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use((req: Request, res: Response, next: NextFunction) => {
  req.body.name = 'wahaha'
  next()
})
app.use(router)

app.listen(3000, () => {
  console.log('app is running')
})
