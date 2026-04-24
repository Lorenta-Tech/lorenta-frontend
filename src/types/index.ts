export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  selected: boolean;
}

export interface DocumentConfig {
  id: string;
  fileId: string;
  name: string;
  range: string;
  copies: number;
  isColor: boolean;
}

export interface CartItem extends DocumentConfig {
  price: number;
}

export type OrderStatus = 'idle' | 'paid' | 'confirmed' | 'success';

export interface Order {
  otp: string;
  printerId: string;
  status: OrderStatus;
}

export interface AppState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  files: UploadedFile[];
  selectedDocuments: DocumentConfig[];
  cartTotal: number;
  order: Order;
}

export interface UserInfo {
  name: string;
  email: string;
  avatar: string;
}