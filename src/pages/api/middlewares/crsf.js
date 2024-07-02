// middlewares/csrf.js
const csrf = require('csrf');
const tokens = new csrf();
const Cookies = require('universal-cookie');

const csrfSecret = process.env.CSRF_SECRET || 'default_secret';

const generateCsrfToken = (req, res) => {
  const csrfToken = tokens.create(csrfSecret);
  res.setHeader('Set-Cookie', `csrfToken=${csrfToken}; Secure; SameSite=Strict; Path=/`);
  return csrfToken;
};

const verifyCsrfToken = (req) => {
  const cookies = new Cookies(req.headers.cookie);
  const csrfToken = cookies.get('csrfToken');
  return tokens.verify(csrfSecret, csrfToken);
};

const csrfMiddleware = (handler) => (req, res) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    if (!verifyCsrfToken(req)) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }
  }
  return handler(req, res);
};

module.exports = { csrfMiddleware, generateCsrfToken };
