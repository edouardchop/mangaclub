import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const authenticate = (handler) => async (req, res) => {
  // Lire le cookie directement depuis les en-têtes HTTP
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;
  
  
  if ( !token )
  {
    return res.status( 401 ).json( { message: 'Authentication required' } );
  }

  try
  {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authenticate;
