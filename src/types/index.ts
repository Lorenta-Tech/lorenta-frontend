export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  content: File;
  pages?: number
}

export interface DocumentConfig {
  id: string;
  name: string;
  range: string;
  copies: number;
  pagesPerSide: number;
  isColor: boolean;
  duplex: boolean
}

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