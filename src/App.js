import "./App.css";
import { useEffect, useState } from "react";
import { converter } from "./api/index";
import Select from "react-select";
function App() {
  var values = [
    { value: "INR", label: "Indian Rupee" },
    { value: "USD", label: "United States Dollar" },
    { value: "AED", label: "United Arab Emirates Dirham" },
    { value: "GBP", label: "Pound sterling" },
    { value: "CAD", label: "Canadian Dollar" },
    { value: "SGD", label: "Singapore Dollar" },
    { value: "EUR", label: "Euro" },
    { value: "JPY", label: "Japanese Yen" },
    { value: "PKR", label: "Pakistani Rupee" },
    { value: "ZAR", label: "South African Rand" },
  ];
  var [from, setfrom] = useState(values[0]);
  var [to, setto] = useState(values[1]);
  const [all, setall] = useState([]);
  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState(0);
  useEffect(async () => {
    setToValue(await converter({ from: from.value, to: to.value }));
    if (from.value == to.value) {
      var _ = [];

      for (let index = 0; index < values.length; index++) {
        const element = values[index];
        _.push({
          currency: element.label,
          value:
            fromValue *
            (await converter({ from: from.value, to: element.value })),
        });
      }

      setall(_);
    }
  });

  return (
    <div className="App">
      <div className="card">
        <p
          style={{
            fontSize: "small",
            padding: "0",
            color: "grey",
            fontWeight: "bold",
          }}
        >
          {fromValue} {from.label} equals to{" "}
        </p>
        <h4
          style={{
            fontSize: "large",
            padding: "0",
            color: "#121212",
            fontWeight: "bold",
          }}
        >
          {toValue} {to.label}{" "}
        </h4>
        <div className="grid">
          <input
            value={fromValue}
            onChange={async (e) => {
              setFromValue(e.target.value);
              setToValue(
                e.target.value *
                  (await converter({ from: from.value, to: to.value }))
              );
            }}
            type="number"
          ></input>
          <span style={{ width: "10px", height: "10px" }}></span>
          <Select
            className="select"
            options={values}
            onChange={async (e) => {
              setfrom(e);
              setToValue(
                fromValue * (await converter({ from: e.value, to: to.value }))
              );
            }}
            defaultValue={values[0]}
          ></Select>

          <input
            value={toValue}
            onChange={async (e) => {
              setToValue(e.target.value);
              setFromValue(
                e.target.value *
                  (await converter({ from: to.value, to: from.value }))
              );
            }}
            type="number"
          ></input>

          <Select
            className="select"
            options={values}
            onChange={async (e) => {
              setto(e);
              setFromValue(
                toValue * (await converter({ from: from.value, to: e.value }))
              );
            }}
            defaultValue={values[1]}
          ></Select>
        </div>
      </div>
      {from.value === to.value ? (
        <div>
          {all.map((elment) => (
            <p>
              {fromValue} {from.label} is equals to {elment.value}{" "}
              {elment.currency}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default App;
