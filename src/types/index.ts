export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content: File;
  pages: number;
}

export interface DocumentConfig {
  file_id: string;
  copies: number;
  printing_side: string;
  printing_mode: string;
  page_range: string[];  
  page_layout: number;
  num_of_pages: number;
}

export interface CartItem{
  file: UploadedFile;
  config: DocumentConfig;
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