// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);
