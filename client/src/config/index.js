const dateDistance = (date) => {
  const date1ms = Date.now() + new Date().getTimezoneOffset();
  const date2ms = new Date(date).getTime();

  const differenceMs = date1ms - date2ms;
  if (differenceMs >= 30 * 24 * 60 * 60 * 1000)
    return `${new Date(date).toDateString().split(" ").slice(1).join(" ")}`;
  if (differenceMs >= 24 * 60 * 60 * 1000)
    return `${Math.floor(differenceMs / (24 * 60 * 60 * 1000))} days ago`;
  else if (differenceMs >= 60 * 60 * 1000)
    return `${Math.floor(differenceMs / (60 * 60 * 1000))} hours ago`;
  else if (differenceMs >= 60 * 1000)
    return `${Math.floor(differenceMs / (60 * 1000))} minutes ago`;
  return `${Math.floor(differenceMs / 1000)} seconds ago`;
};

module.exports = {
  dateDistance,
};
