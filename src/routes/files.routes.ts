import { Router } from 'express';

import {
  uploadSingleFile,
  getFilesBucket,
  getSingleFilesBucket,
} from '../controllers/files.controller';

const router = Router();

router.route('/').get(getFilesBucket).post(uploadSingleFile);
router.get('/:fileName', getSingleFilesBucket);

export default router;
