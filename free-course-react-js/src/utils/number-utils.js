export const shortenNumber = (number) => {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
};

export const convertTime = (time) => {
  const tempTime = new Date(time).getTime();
  return new Date(tempTime - 1).toISOString();
};
