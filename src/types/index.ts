export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content: File;
  pages: number;
}

export interface DocumentConfig {
  id: string;
  isPDF: boolean;
  name: string;
  range: string[];
  copies: number;
  pagesPerSheet: number;
  isColor: boolean;
  duplex: boolean;
  totalPages: number;
}

export interface Order {
  session_id: string;
  totalpages: number;
  price: number;
  orderDate: string;
  status: string; 
  files: any[];
};

export interface AppState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  files: UploadedFile[];
  selectedDocuments: DocumentConfig[];
  cartTotal: number;
}

export interface UserInfo {
  name: string;
  email: string;
  avatar: string;
}