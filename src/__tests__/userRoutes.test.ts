import http from 'http';
import supertest from 'supertest';
import userRoutes from '../routes/userRoutes';

const PORT = 4000;
let server: http.Server;
const request = supertest(`http://localhost:${PORT}`);

beforeAll((done) => {
  server = http.createServer((req, res) => {
    userRoutes(req, res);
  });

  server.listen(PORT, (err?: Error) => {
    if (err) {
      console.error('Error starting server:', err);
      return done(err);
    }
    console.log(`Test server is running on http://localhost:${PORT}`);
    done();
  });
}, 15000);

afterAll((done) => {
  if (server) {
    server.close((err) => {
      if (err) {
        console.error('Error closing server:', err);
        return done(err);
      }
      console.log('Server closed');
      done();
    });
  } else {
    console.log('Server was not started');
    done();
  }
});

describe('User API', () => {
  let createdUserId: string;

  it('should return an empty array for GET /api/users', async () => {
    const res = await request.get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should create a new user with POST /api/users', async () => {
    const newUser = {
      username: 'Jane Doe',
      age: 30,
      hobbies: ['reading', 'coding'],
    };

    const res = await request.post('/api/users').send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newUser);
    expect(res.body.id).toBeDefined();
    createdUserId = res.body.id;
  });

  it('should get the created user with GET /api/users/{id}', async () => {
    const res = await request.get(`/api/users/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: createdUserId,
        username: 'Jane Doe',
        age: 30,
        hobbies: ['reading', 'coding'],
      })
    );
  });

  it('should update the created user with PUT /api/users/{id}', async () => {
    const updatedUser = {
      username: 'Jane Doe',
      age: 32,
      hobbies: ['reading', 'gaming'],
    };

    const res = await request
      .put(`/api/users/${createdUserId}`)
      .send(updatedUser);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(updatedUser);
    expect(res.body.id).toBe(createdUserId);
  });

  it('should delete the created user with DELETE /api/users/{id}', async () => {
    const res = await request.delete(`/api/users/${createdUserId}`);
    expect(res.status).toBe(204);
  });

  it('should not find the deleted user with GET /api/users/{id}', async () => {
    const res = await request.get(`/api/users/${createdUserId}`);
    expect(res.status).toBe(404);
  });
});
