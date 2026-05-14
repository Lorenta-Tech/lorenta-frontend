import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";

type ModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-darkbg/70 p-3 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Modal"}
      >
        <div className="flex min-h-[60px] items-center justify-between gap-3 border-b border-white/15 px-4">
          <span className="truncate font-bold text-white">{title}</span>
          <button type="button" className="grid size-10 place-items-center rounded-xl text-white/60 transition hover:bg-white/5 hover:text-white" onClick={onClose} aria-label="Close modal">
            <IoMdClose size={22} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden bg-white/5 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
