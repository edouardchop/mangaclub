// Importez le fichier de connexion à la base de données
import db from '.../utils/db.js'

export default async function handler(req, res) {
  try {
    // Utilisez la connexion pour effectuer une opération de base de données simple
    const result = await db.query('SELECT NOW() as current_time');
    
    // Renvoyez la réponse avec le résultat de la base de données
    res.status(200).json({ currentTime: result.rows[0].current_time });
  } catch (error) {
    console.error('Erreur de la base de données:', error);
    res.status(500).json({ error: 'Erreur de la base de données' });
  }
}
