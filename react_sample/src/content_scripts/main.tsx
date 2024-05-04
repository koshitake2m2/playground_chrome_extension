import React from "react";
import ReactDOM from "react-dom/client";
import { calc } from "../share/calc";
import { HelloComponent } from "../share/hello";

console.log("Popup script is running!");
console.log(calc(1, 2));

const newElement = document.createElement("div");
document.body.appendChild(newElement);

ReactDOM.createRoot(newElement).render(
  <React.StrictMode>
    <h1>hello</h1>
    <p>hello</p>
    <HelloComponent />
  </React.StrictMode>
);
