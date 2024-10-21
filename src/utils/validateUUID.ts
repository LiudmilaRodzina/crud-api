import { validate as uuidValidate } from 'uuid';

export const validateUUID = (uuid: string): boolean => {
  return uuidValidate(uuid);
};
