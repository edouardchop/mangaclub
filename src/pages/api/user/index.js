// pages/api/user/index.js
import User from "@/api/db/models/userModel";  
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstname, lastname, username, email, password, role } = req.body;

    if (!firstname || !lastname || !username || !email || password === undefined) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user in the database
      const newUser = await User.create({
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
        role
      });
      const token = jwt.sign({ username: newUser.username, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.setHeader('Set-Cookie', `token=${token}; Secure; SameSite=Strict; Path=/`);
      res.status(201).json({ message: 'User created successfully', user: newUser, token });
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'An error occurred while creating the user', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
