export const converter = async (data) => {
  var { from, to } = data;
  var res = await fetch(
    "https://v6.exchangerate-api.com/v6/7d3c4902218eaea98e0c33b3/pair/" +
      from +
      "/" +
      to
  );
  var rate = await res.json();
  return rate.conversion_rate;
};
