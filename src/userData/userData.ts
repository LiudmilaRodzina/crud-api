import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [];

export const getUsers = () => {
  return users;
};

export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

export const createUser = (
  username: string,
  age: number,
  hobbies: string[]
): User => {
  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (
  id: string,
  updatedUserData: Partial<User>
): User | undefined => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    const updatedUser = { ...users[userIndex], ...updatedUserData };
    users[userIndex] = updatedUser;
    return updatedUser;
  }
  return undefined;
};
