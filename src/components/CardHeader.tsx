import { IoMdClose } from "react-icons/io";

type CardHeaderProps = {
  title: string;
  onRemove: () => void;
};

const CardHeader: React.FC<CardHeaderProps> = ({ title, onRemove }) => {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3">
      <h3 className="min-w-0 truncate text-base font-bold text-white">{title}</h3>
      <button
        type="button"
        onClick={onRemove}
        className="grid size-10 shrink-0 place-items-center rounded-xl text-white/60 transition hover:bg-cta/10 hover:text-cta"
        aria-label={`Remove ${title}`}
      >
        <IoMdClose size={22} />
      </button>
    </div>
  );
};

export default CardHeader;
