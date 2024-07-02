import User from "@/api/db/models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import xss from 'xss';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Sanitize input
    const sanitizedData = {
      firstname: xss(req.body.firstname),
      lastname: xss(req.body.lastname),
      username: xss(req.body.username),
      email: xss(req.body.email),
      password: xss(req.body.password),
      role: xss(req.body.role)
    };

    const { firstname, lastname, username, email, password, role } = sanitizedData;

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

      // Generate JWT token
      const token = jwt.sign({ username: newUser.username, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.setHeader('Set-Cookie', `token=${token}; Secure; HttpOnly; SameSite=Strict; Path=/`);
      res.status(201).json({ message: 'User created successfully', user: newUser, token });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'An error occurred while creating the user', error: error.message });
    }
  } 
else if (req.method === 'GET') {
    try {
      // Récupérer tous les utilisateurs depuis la base de données
      const users = await User.findAll();

      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'An error occurred while fetching users', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
