export default (date: Date) => {
  const rawISOString = date.toISOString();

  let [dateString, timeString] = rawISOString.split('T');
  timeString = timeString.slice(0, timeString.lastIndexOf(':'));
  return `${dateString} ${timeString}`;
};
