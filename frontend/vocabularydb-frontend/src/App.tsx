// import './App.css'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core'
import AuthPage from './routes/auth-route/auth-page';

function App() {

  return (
    <MantineProvider>
      <AuthPage/>
    </MantineProvider>
  )
}

export default App
