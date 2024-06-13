// TEMPORAIRE


import { useUser } from '@auth0/nextjs-auth0/client';
import jwt_decode from 'jwt-decode';

export default function Decode() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    const decodedToken = jwt_decode(user.idToken);
    const roles = decodedToken['https://your-app.com/roles'] || [];

    return (
      <div>
        Welcome {user.name}!
        {roles.includes('admin') && <p>You have admin access.</p>}
        <a href="/">Logout</a>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
