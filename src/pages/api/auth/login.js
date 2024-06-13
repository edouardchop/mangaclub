// pages/api/auth/login.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('@/api/db/models/userModel');
const sequelize = require( '@/api/db/newSequelize' );

export default async function handler ( req, res )
{////NOPE
  if ( req.method !== 'POST' )
  {
    const { email, password } = req.body;

    try
    {
      await sequelize.sync();

      // Trouvez l'utilisateur
      const user = await User.findOne( { where: { email } } );
      if ( !user )
      {
        return res.status( 401 ).json( { message: 'Invalid email or password' } );
      }

      // Vérifiez si le mot de passe est correct
      const isValid = await bcrypt.compare( password, user.password );
      if ( !isValid )
      {
        return res.status( 401 ).json( { message: 'Invalid email or password' } );
      }

      // Créez le token JWT
      const token = jwt.sign({ userUsername: newUser.username, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`);
      res.status( 201 ).json( { message: 'User created successfully', user: newUser,token } );

      res.status( 200 ).json( { token } );
    } catch ( error )
    {return res.status( 401 ).json( { message: 'erreur lors de l authentification' } );
      res.status( 500 ).json( { message: 'Internal server error' } );
    }
  }
}