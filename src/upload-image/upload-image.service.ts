import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './upload-image.response';
//import multer from 'multer';
import streamifier from 'streamifier';
//const streamifier = require('streamifier')

@Injectable()
export class UploadImageService {
  uploadImage(image: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error)
            return reject(
              new Error(`Cloudinary upload failed: ${error.message}`),
            );
          if (!result)
            return reject(
              new Error('Cloudinary upload failed: No result returned'),
            );
          resolve(result);
        },
      );
      streamifier.createReadStream(image.buffer).pipe(uploadStream);
    });
  }
}
