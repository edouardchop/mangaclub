// pages/api/user.js
import { AwsService } from '../utils/ServiceAws';


export default async function handler ( req, res )
{ const aws = new AwsService();
  if ( req.method == "GET" )
  {
    try
    {
      const fileKey = req.query.Key
      console.log("fileKey : ",fileKey);
      const imageData = await aws.getFileStream( fileKey );

      // Envoyer directement les données de l'image sans enveloppe JSON
      res.setHeader( 'Content-Type', 'image/jpeg' );
      res.send( imageData.file ); // Utilisez imageData.file pour obtenir le buffer de l'image
    } catch ( error )
    {
      console.error( 'Error fetching image:', error );
      res.status( 500 ).json( { error: 'Internal Server Error' } );
    }
  }
  
  else if ( req.method === "POST" )
  {
    try
    { 
                const name=req.body.name
                const type=req.body.type
                const buf=req.body.buf
console.log(req.body.type)
      const imageData = await aws.uploadFile( name, type, buf )
     res.send("succès")
    } catch ( error )
    {
      console.error( 'Error uploading image:', error )
      res.status(500)
    }

     
  }
}

