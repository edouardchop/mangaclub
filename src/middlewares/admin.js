// src/middlewares/admin.js
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';

const authenticateAdmin = (handler) => async (ctx) => {
  const { req, res } = ctx;
  const cookies = new Cookies(req.headers.cookie);
  const token = cookies.get('token');

  if (!token) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return {
        redirect: {
          destination: '/unauthorized',
          permanent: false,
        },
      };
    }
    return handler(ctx);
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default authenticateAdmin;
