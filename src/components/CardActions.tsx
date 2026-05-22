type CardActionsProps = {
  onView: () => void;
  onApplyToAll: () => void;
};

const CardActions: React.FC<CardActionsProps> = ({
  onView,
}) => {
  return (
    <div className="flex min-w-0 flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onView}
        className="min-h-10 w-full rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/15 sm:w-auto"
      >
        View
      </button>


    </div>
  );
};

export default CardActions;
