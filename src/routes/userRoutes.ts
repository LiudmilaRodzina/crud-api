import { getUsers, getUserById } from '../userData/userData';
import { validateUUID } from '../utils/validateUUID';

const userRoutes = async (req: any, res: any) => {
  if (req.method === 'GET' && req.url === '/api/users') {
    const users = getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (req.method === 'GET' && req.url?.startsWith('/api/users/')) {
    const userId = req.url.split('/')[3];

    if (!validateUUID(userId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid UUID format' }));
      return;
    }

    const user = getUserById(userId);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
};

export default userRoutes;
