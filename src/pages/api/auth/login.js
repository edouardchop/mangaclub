import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from "@/api/db/models/userModel";
import { generateCsrfToken } from '@/middlewares/crsf';
import xss from 'xss';
import slowDown from 'express-slow-down';

// Configurer le rate limiter avec express-slow-down
const speedLimiter = slowDown({
  delayAfter:()=> 10, // Permet 10 requêtes avant de commencer à ralentir
  delayMs: () => 500,
} );

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Appliquer le slow down middleware
    speedLimiter(req, res, async () => {
      try {
        // Sanitize input using xss
        const { username, password } = {
          username: xss(req.body.username),
          password: xss(req.body.password)
        };

        // Find the user by username
        const user = await User.findOne({ where: { username } });

        if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password in the database
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
        // Generate CSRF token
        const csrfToken = generateCsrfToken(req, res);

        res.setHeader('Set-Cookie', [
          `token=${token}; Secure; HttpOnly; SameSite=Strict; Path=/`,
          `csrfToken=${csrfToken}; Secure; SameSite=Strict; Path=/`
        ]);

        res.status(200).json({ message: 'Authentication successful', csrfToken });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred during login', error: error.message });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
