export type ItemType = 'lost' | 'found';
export type ItemStatus = 'Open' | 'Resolved';

export interface LostFoundItem {
  id: string;
  name: string;
  type: ItemType;
  date: string;
  time: string;
  location: string;
  description: string;
  status: ItemStatus;
  image: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}
