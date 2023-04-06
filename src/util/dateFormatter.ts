export default (date: Date) => {
  console.log(date);
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}`;
};
