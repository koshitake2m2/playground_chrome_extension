import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelloComponent } from '../share/hello';
import reactSvg from '../assets/react.svg';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h1>popup</h1>
    <p>popup</p>
    <img src={reactSvg} />
    <HelloComponent />
  </React.StrictMode>,
);
