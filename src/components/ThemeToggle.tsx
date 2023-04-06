import { createSignal, onMount } from 'solid-js';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import SystemIcon from '../icons/SystemIcon';

type Theme = 'light' | 'dark' | 'system';

export default () => {
  const [theme, setTheme] = createSignal<Theme>('system');

  const prettyThemeName = () => {
    const themeName = theme();
    return themeName.charAt(0).toUpperCase() + themeName.slice(1);
  };

  const iconComponent = () => {
    if (theme() === 'system') {
      return <SystemIcon />;
    } else if (theme() === 'light') {
      return <SunIcon />;
    }

    return <MoonIcon />;
  };

  const onButtonClick = () => {
    setTheme((prev) => {
      // Switch order is: system -> light -> dark
      if (prev === 'system') {
        localStorage['theme'] = 'light';
        document.documentElement.classList.remove('dark');
        return 'light';
      } else if (prev === 'light') {
        localStorage['theme'] = 'dark';
        document.documentElement.classList.add('dark');
        return 'dark';
      } else {
        localStorage.removeItem('theme');

        console.log('no dark wanted');
        if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
          console.log('no dark wanted');
          document.documentElement.classList.remove('dark');
        }

        return 'system';
      }
    });
  };

  onMount(() => {
    // Check if system theme is required, or no preference
    if (!('theme' in localStorage)) {
      setTheme('system');
      return;
    }

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  });

  return (
    <div
      class='border-2 p-3 cursor-pointer border-gray-400 w-12 sm:w-28 flex justify-between items-center transition-all'
      onClick={onButtonClick}
    >
      <span class='font-bold text-gray-400 hidden sm:block'>{prettyThemeName()}</span>
      {iconComponent()}
    </div>
  );
};
