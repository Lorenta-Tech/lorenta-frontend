import { createContext, useContext, useState, ReactNode } from "react";
import { DocumentConfig, UploadedFile, CartItem } from "../types";
import { useEffect, useRef, Dispatch, SetStateAction } from "react";
import { loadCart, saveCart, clearCartDB } from "../helper/db";

interface CartContextType {
  items: CartItem[];
  addToCart: (newFiles: UploadedFile[]) => void;
  updateConfig: (updated: DocumentConfig) => void;
  removeConfig: (configId: string) => void;
  applyToAll: (source: DocumentConfig) => void;
  updateFilePages: (configId: string, pages: number) => void;
  totalAmount: number;
  setTotalAmount:  Dispatch<SetStateAction<number>>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const isLoaded = useRef(false);

  useEffect(() => {
    const init = async () => {
      const stored = await loadCart();

      if (stored) {
        setItems(stored.items || []);
        setTotalAmount(stored.totalAmount || 0);
      }

      isLoaded.current = true;
    };

    init();
  }, []);

 useEffect(() => {
    if (!isLoaded.current) return;

    saveCart({
      items,
      totalAmount,
    });
  }, [items, totalAmount]);

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
            file_id: file.id,
            page_range: [`1-${file.pages}`],
            copies: 1,
            page_layout: 1,
            printing_mode: "monochromatic",
            printing_side: "single_side",
            num_of_pages: file.pages,
          },
        }));

      return [...prev, ...newItems];
    });
  };

  const updateConfig = (updated: DocumentConfig) => {
    setItems((prev) =>
      prev.map((item) =>
        item.config.file_id === updated.file_id
          ? { ...item, config: updated }
          : item
      )
    );
  };

  const updateFilePages = (configId: string, pages: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.config.file_id !== configId) return item;
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
      prev.filter((item) => item.config.file_id !== configId)
    );
  };

  const applyToAll = (source: DocumentConfig) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        config: {
          ...item.config,
          copies: source.copies,
          pagesPerSheet: source.page_layout,
          isColor: source.printing_mode,
          duplex: source.printing_side,
        },
      }))
    );
  };

  const clearCart = () => {
    setItems([]);
    clearCartDB();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateConfig,
        removeConfig,
        applyToAll,
        updateFilePages,
        totalAmount,
        setTotalAmount,
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