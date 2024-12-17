import { v4 as uuidv4 } from 'uuid';

export default function addId(item) {
  return { ...item, id: uuidv4() };
}
