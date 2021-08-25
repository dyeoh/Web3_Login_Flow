import express, {Request, Response} from 'express';
require ('./db.ts');

import { router } from './routes';

const port = 3000;

const app = express();

app.use('/api', router);

app.get('/',async (req :Request, res:Response) => {
  res.send('Hi!')
})

app.listen(port, () => {
  console.log(`Server running at on ${port}`);
});