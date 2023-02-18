import { useEffect, useState, useMemo } from 'react';

interface Props {
  isChecked: boolean;
  text: string;
  onClick: (text: string) => void;
}

const ToggleButton = ({ isChecked, text, onClick }: Props) => {
  const selectionStyle = useMemo(() => {
    if (isChecked) {
      return 'bg-tiffany-blue-900';
    }

    return 'hover:bg-tiffany-blue-500';
  }, [isChecked]);

  return (
    <button
      className={`border border-tiffany-blue-900 p-2 rounded-md transition ${selectionStyle}`}
      onClick={() => onClick(text)}
    >
      {text}
    </button>
  );
};

export default ToggleButton;
