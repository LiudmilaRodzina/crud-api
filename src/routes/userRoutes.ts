import { getUsers } from '../userData/userData';

const userRoutes = (req: any, res: any) => {
  if (req.method === 'GET' && req.url === '/api/users') {
    const users = getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
};

export default userRoutes;
