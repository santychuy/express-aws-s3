import express from 'express';
import fileUpload from 'express-fileupload';

const app = express();

app.use(fileUpload());

app.get('/', (_req, res) => {
  res.json({ message: 'Express AWS S3 example' });
});

export default app;
