import { IoMdClose } from "react-icons/io";

type CardHeaderProps = {
  title: string;
  onRemove: () => void;
};

const CardHeader: React.FC<CardHeaderProps> = ({ title, onRemove }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-lg truncate">{title}</h3>
      <button
        onClick={onRemove}
        className="text-gray-500 hover:text-red-700"
      >
        <IoMdClose size="30" />
      </button>
    </div>
  );
};

export default CardHeader;