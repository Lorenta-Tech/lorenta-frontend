import { IoMdClose } from "react-icons/io";

type ModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2"
      onClick={onClose}
    >
      <div
        className="bg-gray-100 w-full max-w-3xl md:h-[90vh] h-[80vh] rounded-xl shadow-xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
          <span className="truncate">{title}</span>
          <button onClick={onClose}>
            <IoMdClose size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;