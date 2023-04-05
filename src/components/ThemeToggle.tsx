import { createSignal } from 'solid-js';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';

type Theme = 'light' | 'dark';

export default () => {
  const [theme, setTheme] = createSignal<Theme>('light');

  const prettyThemeName = () => {
    const themeName = theme();
    return themeName.charAt(0).toUpperCase() + themeName.slice(1);
  };

  const onButtonClick = () => {
    setTheme((prev) => {
      if (prev === 'dark') return 'light';
      else return 'dark';
    });
  };

  return (
    <div
      class='border-2 p-3 cursor-pointer border-gray-400 w-12 sm:w-24 flex justify-between transition-all'
      onClick={onButtonClick}
    >
      <span class='font-bold text-gray-400 hidden sm:block'>{prettyThemeName()}</span>
      {theme() === 'light' ? <SunIcon /> : <MoonIcon />}
    </div>
  );
};
