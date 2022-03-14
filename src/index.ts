import express, { Request, Response, NextFunction } from 'express';
import cookieSession from 'cookie-session';
import './controller/LoginController';
import './controller/CrowllerController';
import { router } from './controller/decorator';
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['secret'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  req.body.name = 'wahaha';
  next();
});
app.use(router);

app.listen(3000, () => {
  console.log('app is running');
});
