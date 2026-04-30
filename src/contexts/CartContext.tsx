import { createContext, useContext, useState, ReactNode } from "react";
import { DocumentConfig, UploadedFile } from "../types";
import { useEffect, useRef } from "react";

type CartItem = {
  file: UploadedFile;
  config: DocumentConfig;
};

interface CartContextType {
  uploadedFiles: UploadedFile[];
  configs: DocumentConfig[];
  items: CartItem[];
  addToCart: (newFiles: UploadedFile[]) => void;
  updateConfig: (updated: DocumentConfig) => void;
  removeConfig: (configId: string) => void;
  applyToAll: (source: DocumentConfig) => void;
  updateFilePages: (configId: string, pages: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!isLoaded.current) return; 
  }, [items]);

  

  const addToCart = (newFiles: UploadedFile[]) => {
    setItems((prev) => {
      const existing = new Set(
        prev.map((i) => `${i.file.name}-${i.file.size}`)
      );

      const seen = new Set<string>();

      const newItems: CartItem[] = newFiles.filter((f) => {
          const key = `${f.name}-${f.size}`;
          if (existing.has(key) || seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map((file) => ({
          file,
          config: {
            id: crypto.randomUUID(),
            isPDF: file.type === "application/pdf",
            name: file.name,
            range: [`1-${file.pages}`],
            copies: 1,
            pagesPerSheet: 1,
            isColor: false,
            duplex: false,
            totalPages: file.pages,
          },
        }));

      return [...prev, ...newItems];
    });
  };

  const updateConfig = (updated: DocumentConfig) => {
    setItems((prev) =>
      prev.map((item) =>
        item.config.id === updated.id
          ? { ...item, config: updated }
          : item
      )
    );
  };

  const updateFilePages = (configId: string, pages: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.config.id !== configId) return item;
        if (item.file.pages === pages) return item;

        return {
          ...item,
          file: { ...item.file, pages },
        };
      })
    );
  };

  const removeConfig = (configId: string) => {
    setItems((prev) =>
      prev.filter((item) => item.config.id !== configId)
    );
  };

  const applyToAll = (source: DocumentConfig) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        config: {
          ...item.config,
          copies: source.copies,
          pagesPerSheet: source.pagesPerSheet,
          isColor: source.isColor,
          duplex: source.duplex,
        },
      }))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // derived state (no duplication)
  const uploadedFiles = items.map((i) => i.file);
  const configs = items.map((i) => i.config);

  return (
    <CartContext.Provider
      value={{
        uploadedFiles,
        configs,
        items,
        addToCart,
        updateConfig,
        removeConfig,
        applyToAll,
        updateFilePages,
        clearCart,
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