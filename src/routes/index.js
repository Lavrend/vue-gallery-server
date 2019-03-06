import { version, description } from '@root/package.json';
import { Router } from 'express';

const app = Router();

app.get('/', function(req, res, next) {
  res.status(200).json({
    message: `${description} (v${version})`,
  });
});

export default app;
