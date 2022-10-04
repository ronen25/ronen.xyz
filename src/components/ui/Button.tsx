interface Props {
  text: string;
  onClick?: () => void;
  enabled?: boolean;
}

const Button = ({ text, enabled = true, onClick }: Props) => {
  return (
    <button
      className={`border border-tiffany-blue-900 p-2 rounded-md transition hover:bg-tiffany-blue-500 bg-tiffany-blue-900`}
      onClick={onClick}
      disabled={!enabled}
    >
      {text}
    </button>
  );
};

export default Button;
