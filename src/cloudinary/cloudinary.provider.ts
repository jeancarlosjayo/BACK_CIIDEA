import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'dvwfcntca',
      api_key: '433161768481835',
      api_secret: '_jDkBvPGtfLy2KvqxHUxrjZrJhM',
    });
  },
};