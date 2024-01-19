// pages/api/user.js
import { AwsService } from '../../api/db/utils/ServiceAws';


export default async function handler(req, res) {
  const aws = new AwsService();
  const fileKey = 'bleach.jpg'; // Remplacez par le bon nom de fichier

  try {
    const imageData = await aws.getFileStream({ fileKey });

    // Envoyer directement les données de l'image sans enveloppe JSON
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageData.file); // Utilisez imageData.file pour obtenir le buffer de l'image
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

