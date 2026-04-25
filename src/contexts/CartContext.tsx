import { createContext, useContext, useState, ReactNode } from "react";
import { DocumentConfig, UploadedFile } from "../types";

interface CartContextType {
  uploadedFiles: UploadedFile[];
  configs: DocumentConfig[];
  addToCart: (newFiles: UploadedFile[]) => void;
  updateConfig: (updated: DocumentConfig) => void;
  removeConfig: (configId: string) => void;
  applyToAll: (source: DocumentConfig) => void;
  updateFilePages: (fileId: string, pages: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [configs, setConfigs] = useState<DocumentConfig[]>([]);

  const addToCart = (newFiles: UploadedFile[]) => {
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    const newConfigs = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      fileId: file.id,
      name: file.name,
      range: "",
      copies: 1,
      pagesPerSide: 1,
      isColor: false,
      duplex: false,
    }));

    setConfigs((prev) => [...prev, ...newConfigs]);
  };

  const updateConfig = (updated: DocumentConfig) => {
    setConfigs((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const updateFilePages = (fileId: string, pages: number) => {
    setUploadedFiles((prev) =>
      prev.map((file) => {
        if (file.id !== fileId) return file;
        if (file.pages === pages) return file;
        
        return { ...file, pages };
      })
    );
  };

  const removeConfig = (configId: string) => {
    setConfigs((prev) => {
      const configToRemove = prev.find((c) => c.id === configId);
      if (configToRemove) {
        setUploadedFiles((files) =>
          files.filter((f) => f.id !== configToRemove.fileId)
        );
      }
      return prev.filter((c) => c.id !== configId);
    });
  };

  const applyToAll = (source: DocumentConfig) => {
    setConfigs((prev) =>
      prev.map((c) => ({
        ...c,
        range: source.range,
        copies: source.copies,
        pagesPerSide: source.pagesPerSide,
        isColor: source.isColor,
        duplex: source.duplex,
      }))
    );
  };

  const clearCart = () => {
    setUploadedFiles([]);
    setConfigs([]);
  };

  return (
    <CartContext.Provider
      value={{
        uploadedFiles,
        configs,
        addToCart,
        updateConfig,
        removeConfig,
        applyToAll,
        updateFilePages,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

