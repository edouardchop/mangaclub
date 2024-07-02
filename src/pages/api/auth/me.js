import authenticate from '../../../middlewares/auth';

const handler = ( req, res ) =>
{
  res.status( 200 ).json( { user: req.user } );
};

export default authenticate(handler);
