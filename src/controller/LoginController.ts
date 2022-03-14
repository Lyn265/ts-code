import { Request, Response } from 'express';
import 'reflect-metadata';
import { controller, get, post } from '../decorator';
import { getResponseData } from '../utils/util';
interface bodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller
class LoginController {
  @post('/login')
  login(req: bodyRequest, res: Response) {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
      res.json(getResponseData(null, '已经登录'));
    } else {
      if (req.session && req.body.password === '123') {
        req.session.login = true;
        res.json(getResponseData(true));
      } else {
        res.json(getResponseData(null, 'getData error'));
      }
    }
  }
  @get('/logout')
  logout(req: bodyRequest, res: Response) {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true));
  }

  @get('/')
  home(req: bodyRequest, res: Response) {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
      res.send(
        `<body>
          <a href='/getData'>爬取内容</a>
          <a href='/showData'>展示内容</a>
          <a href='/logout'>退出</a>
        </body>`
      );
    } else {
      res.send(
        `<body>
        <form action='login' method='post'>
        <input type='password' name='password'/>
        <button>提交</button>
        </form>
        </body>`
      );
    }
  }
}
