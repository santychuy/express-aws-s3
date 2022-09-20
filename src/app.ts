import express from 'express';
import fileUpload from 'express-fileupload';

import FilesRoutes from '@routes/files.routes';

const app = express();

app.use(fileUpload({ useTempFiles: true, tempFileDir: './uploads' }));

app.use('/file', FilesRoutes);

export default app;
