const format = (value: number): string => {
  if (value < 1000) {
    return value.toString();
  }

  // Determine rounding
  let divider = 0;
  let letter;
  if (value >= 1000 && value < 1_000_000) {
    divider = 1000;
    letter = 'K';
  } else if (value >= 1_000_000 && value < 10_000_000) {
    divider = 1_000_000;
    letter = 'M';
  }

  const rounded = Math.round(value / divider);
  return `${rounded}${letter}`;
};

export default format;
