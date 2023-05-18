import express from 'express';
import {useExpressApp} from './useApp';

export const app = express();

export function server() {
  useExpressApp(app);
  app.listen(3000, () => {
    console.log('servidor rodando');
  });
}
