export const converter = async (data) => {
  var { from, to } = data;
  var res = await fetch(
    "https://v6.exchangerate-api.com/v6/89c70a233a2c057b134f316f/pair/" +
      from +
      "/" +
      to
  );
  var rate = await res.json();
  return rate.conversion_rate;
};
