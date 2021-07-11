import multer from 'multer';
import fs from 'fs';

 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `uploads/users/profile/${req.admin._id}/`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req, file, cb) => cb(null, 'profile.png'),
});

export const upload = multer({ storage: storage });

export async function uploadImages(req: any, res: any) {

  try {
    return res.status(201).json({
      message: 'File uploded successfully',
    });
  } catch (error) {
    console.error(error);
  }
}

