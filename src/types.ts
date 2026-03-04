export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  image: string;
}

export interface Lead {
  name: string;
  email: string;
  phone: string;
  carModel: string;
  service: string;
  message: string;
}

export interface Booking {
  name: string;
  email: string;
  date: string;
  time: string;
  service: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
