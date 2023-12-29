import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { MantineProvider } from '@mantine/core'
import { store, persistor } from './redux-state/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
