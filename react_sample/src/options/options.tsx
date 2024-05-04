import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelloComponent } from '../share/hello';
import reactSvg from '../assets/react.svg';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h1>Options</h1>
    <p>options</p>
    <img src={reactSvg} />
    <HelloComponent />
  </React.StrictMode>,
);
