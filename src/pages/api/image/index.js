import { AwsService } from '../../../api/db/ServiceAws';
import xss from 'xss';

export default async function handler(req, res) {
  const aws = new AwsService();

  if (req.method === 'GET') {
    try {
      const fileKey = xss(req.query.Key); // Sanitize input
      const imageData = await aws.getFileStream(fileKey);

      res.setHeader('Content-Type', 'image/jpeg');
      res.send(imageData.file); // Use imageData.file to get the image buffer
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const name = xss(req.body.name); // Sanitize input
      const type = xss(req.body.type); // Sanitize input
      const buf = req.body.buf; // Buffer is binary data, no need to sanitize
      const imageData = await aws.uploadFile(name, type, buf);
      res.status(200).json({ message: 'Success', data: imageData });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
