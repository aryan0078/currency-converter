export const converter = async (data) => {
  var { from, to } = data;
  var res = await fetch(
    "https://v6.exchangerate-api.com/v6/5efce7dd14df1250b1d936fb/pair/" +
      from +
      "/" +
      to
  );
  var rate = await res.json();
  return rate.conversion_rate;
};
