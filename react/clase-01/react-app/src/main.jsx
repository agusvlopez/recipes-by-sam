import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import { Provider } from 'react-redux';
import { store } from './features/store';


//indicamos donde queremos que se renderice react, obtenemos el id del archivo main.js
ReactDOM.createRoot(
  document.getElementById('root')
)
  .render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
