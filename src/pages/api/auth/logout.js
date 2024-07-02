export default function handler(req, res) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', [
      'token=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0',
      'csrfToken=; SameSite=Strict; Path=/; Max-Age=0'
    ]);
    res.status(200).json({ message: 'Logout successful' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
