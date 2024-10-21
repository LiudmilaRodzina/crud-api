## CRUD API

### Prerequisites

- Use 22.x.x version (22.9.0 or upper) of Node.js
  - Check your Node.js version with:
    ```bash
    node --version
    ```

### Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**:
   - Copy the `.env.sample` file to `.env` and set the desired port (default is 4000)

### Build and Run

- **Build the application**:
  ```bash
  npm run build
  ```

#### Start the Application

- **Development mode**:
  ```bash
  npm run start
  ```
- **Production mode**:
  ```bash
  npm run start:prod
  ```

### API Endpoints

#### User Management Endpoints

| Method | Endpoint          | Description                                 |
| ------ | ----------------- | ------------------------------------------- |
| GET    | `/api/users`      | Retrieve a list of all users                |
| GET    | `/api/users/{id}` | Retrieve a specific user by their unique ID |
| POST   | `/api/users`      | Create a new user record                    |
| PUT    | `/api/users/{id}` | Update an existing user record              |
| DELETE | `/api/users/{id}` | Delete a user record by their unique ID     |

### User Model

Each user has the following properties:

- `id`: Unique identifier (string, generated as a UUID)
- `username`: User's name (string, required)
- `age`: User's age (number, required)
- `hobbies`: User's hobbies (array of strings, required)

### Error Handling

The API handles errors and returns appropriate HTTP status codes:

- **400 Bad Request**: Returned for invalid requests or data formats
- **404 Not Found**: Returned when a requested user or endpoint does not exist
- **500 Internal Server Error**: Returned for unexpected server issues
