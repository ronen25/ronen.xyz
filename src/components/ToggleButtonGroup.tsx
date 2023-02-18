import { useMemo, useState } from 'react';
import ToggleButton from './ToggleButton';

interface Props {
  options: string[];
  initialOption?: string;
  onCheckedOptionChanged: (currentOption?: string) => void;
}

const ToggleButtonGroup = ({ options, initialOption, onCheckedOptionChanged }: Props) => {
  const [currentOption, setCurrentOption] = useState<string | undefined>(initialOption);

  const onCheckedOptionChangedWrapper = (currentlyClicked: string) => {
    if (currentlyClicked === currentOption) return;

    setCurrentOption(currentlyClicked);
    onCheckedOptionChanged(currentlyClicked);
  };

  const buttons = useMemo(() => {
    return options.map((optionItem: string) => (
      <ToggleButton
        key={`${optionItem}_button`}
        isChecked={optionItem === currentOption}
        text={optionItem}
        onClick={onCheckedOptionChangedWrapper}
      />
    ));
  }, [options, currentOption]);

  return <div className='flex space-x-2'>{buttons}</div>;
};

export default ToggleButtonGroup;
