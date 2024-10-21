import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
} from '../userData/userData';
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
  } else if (req.method === 'POST' && req.url === '/api/users') {
    let body = '';

    req.on('data', (chunk: any) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { username, age, hobbies } = JSON.parse(body);

        if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid input data' }));
          return;
        }

        const newUser = createUser(username, age, hobbies);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON format' }));
      }
    });
  } else if (req.method === 'PUT' && req.url?.startsWith('/api/users/')) {
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
      return;
    }

    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const updatedUserData = JSON.parse(body);

        if (
          !updatedUserData.username &&
          typeof updatedUserData.age !== 'number' &&
          !Array.isArray(updatedUserData.hobbies)
        ) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid input data' }));
          return;
        }

        const updatedUser = updateUser(userId, updatedUserData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUser));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON format' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
};

export default userRoutes;
