type LoaderProps = {
  size?: number;
};

const Loader = ({ size = 30 }: LoaderProps) => {
  return (
    <div
      style={{ width: size, height: size }}
      className="border-2 border-gray-300 border-t-black rounded-full animate-spin"
    />
  );
};

export default Loader;