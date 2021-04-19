import "./App.css";
import { useState } from "react";
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
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

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
            defaultValue={values[0]}
          ></Select>
        </div>
      </div>
    </div>
  );
}

export default App;
