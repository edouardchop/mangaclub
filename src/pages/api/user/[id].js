import { sequelize } from "../../../api/db/newSequelize";
import User from '../../../api/db/models/userModel';
import xss from 'xss';

const handler = async (req, res) => {
  if (req.method === 'DELETE') {
    const userId = xss(req.query.id)
    try {
      await sequelize.authenticate()
      const deleteUser = await User.destroy({ where: { id: userId } });
      if (deleteUser) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
