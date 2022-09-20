import type { Request, Response } from 'express';
import type { UploadedFile } from 'express-fileupload';

import { uploadFile, getFiles, getFile } from '../aws/s3';

export const uploadSingleFile = async (req: Request, res: Response) => {
  if (!req.files) return res.status(404).json({ message: 'File not found' });

  const files = req.files;
  const file = files.file;

  try {
    const resUploadFile = await uploadFile(file as UploadedFile);

    if (resUploadFile?.$metadata.httpStatusCode === 200) {
      return res.status(200).json({ message: 'Successfully Upload Image' });
    }

    return res.status(400).json({ message: 'Error to upload image' });
  } catch (e) {
    return res.status(400).json({ message: e });
  }
};

export const getFilesBucket = async (_req: Request, res: Response) => {
  try {
    const resFiles = await getFiles();

    if (resFiles.$metadata.httpStatusCode !== 200) {
      return res.status(400).json({ message: 'Error request images' });
    }

    return res.json({ content: resFiles.Contents });
  } catch (e) {
    return res.status(400).json({ message: e });
  }
};

export const getSingleFilesBucket = async (req: Request, res: Response) => {
  const { fileName } = req.params;

  try {
    const resObject = await getFile(fileName);

    return res.json({ response: resObject.$metadata });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};
