import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter } from "react-router-dom";
import { RunnerProvider } from './context/Runner';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RunnerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RunnerProvider>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals