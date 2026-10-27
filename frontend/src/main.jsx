
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import './components/Navbar/Navbar.css';
import './components/footer/Footer.css';
import './components/Home/MainHome.css';
import './components/Home/Register.css';
import './components/Home/FindPaper.css';
import './components/Home/PostPaper.css';
import './components/Home/About.css';
import './components/Home/PaperViewer.css';
import './components/Home/Dashboard.css';
import './components/Home/NumericalAbility.css';

import { store } from '/src/components/redux/store.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
