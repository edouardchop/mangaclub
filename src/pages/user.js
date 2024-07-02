import { useUser } from '@auth0/nextjs-auth0/client';
import jwt from 'jsonwebtoken';

export default function User() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    const decodedToken = jwt.decode(user.__raw); // Décodez le jeton JWT
  }


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome { user.name }! <a href="/api/auth/logout">Logout</a>
                <div>Your roles: { jwt.decode(user.__raw)}</div>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}