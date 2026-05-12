type LoaderProps = {
  size?: number;
};

const Loader = ({ size = 30 }: LoaderProps) => {
  return (
    <div
      style={{ width: size, height: size }}
      className="inline-block animate-spin rounded-full border-2 border-white/15 border-t-primary"
      role="status"
      aria-label="Loading"
    />
  );
};

export default Loader;
