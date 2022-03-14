import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import Crowller from '../utils/crowller';
import Analyzer from '../utils/analyzer';
import { getResponseData } from '../utils/util';
import { controller, use, get } from '../decorator';
interface bodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  };
}
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : undefined;
  if (isLogin) {
    next();
  } else {
    res.json(getResponseData(null, '请先登录'));
  }
};
@controller
class CrowllerController {
  @use(checkLogin)
  @get('/getData')
  getData(req: bodyRequest, res: Response) {
    const secretKey = 'x3b174jsx';
    const url = `http://www.dell-lee.com/typescript/demo.html?secrect=${secretKey}`;
    const analyzer = Analyzer.getInstance();
    new Crowller(analyzer, url);
    res.json(getResponseData(true));
  }
  @use(checkLogin)
  @get('/showData')
  showData(req: bodyRequest, res: Response) {
    try {
      const position = path.resolve(__dirname, '../../data/course.json');
      const result = fs.readFileSync(position, 'utf8');
      const jsonObj = JSON.parse(result);
      res.json(getResponseData(jsonObj));
    } catch (error) {
      res.json(getResponseData(null, '文件不存在'));
    }
  }
}
