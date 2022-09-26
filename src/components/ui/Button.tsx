interface Props {
  text: string;
  onClick?: () => void;
}

const Button = ({ text, onClick }: Props) => {
  return (
    <button
      className={`border border-tiffany-blue-900 p-2 rounded-md transition hover:bg-tiffany-blue-500 bg-tiffany-blue-900`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
