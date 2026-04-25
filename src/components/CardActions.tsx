type CardActionsProps = {
  onView: () => void;
  onApplyToAll: () => void;
};

const CardActions: React.FC<CardActionsProps> = ({
  onView,
  onApplyToAll,
}) => {
  return (
    <div className="flex justify-between items-center mt-2">
      <button
        onClick={onView}
        className="text-sm border text-bgsecondary border-bgsecondary px-2 py-1 rounded"
      >
        View
      </button>

      <button
        onClick={onApplyToAll}
        className="text-sm text-bgtertiary border border-bgtertiary px-2 py-1 rounded"
      >
        Apply to all
      </button>
    </div>
  );
};

export default CardActions;