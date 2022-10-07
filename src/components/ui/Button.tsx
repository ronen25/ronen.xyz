interface Props {
  text: string;
  onClick?: () => void;
  enabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ text, type = 'button', enabled = true, onClick }: Props) => {
  return (
    <button
      className={`border border-tiffany-blue-900 p-2 rounded-md transition hover:bg-tiffany-blue-500 bg-tiffany-blue-900 disabled:opacity-50`}
      onClick={onClick}
      disabled={!enabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
