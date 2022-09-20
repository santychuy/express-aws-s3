import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  ListObjectsCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import type { UploadedFile } from 'express-fileupload';
import fs from 'fs';

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_USER_ACCESS_KEY,
    secretAccessKey: process.env.AWS_USER_SECRET_KEY,
  },
});

export const uploadFile = async (file: UploadedFile) => {
  const stream = fs.createReadStream(file.tempFilePath);

  const uploadParams: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream,
  };

  const cmd = new PutObjectCommand(uploadParams);

  try {
    return await s3Client.send(cmd);
  } catch (e) {
    console.error(e);
  }
};

export const getFiles = async () => {
  const cmd = new ListObjectsCommand({ Bucket: process.env.AWS_BUCKET_NAME });

  return await s3Client.send(cmd);
};

export const getFile = async (fileName: string) => {
  const cmd = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  });

  return await s3Client.send(cmd);
};
