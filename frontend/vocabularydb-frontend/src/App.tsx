import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core'
import ToggleAuthenticationForm from './components/Authentication/ToggleAuthenticationForm'

function App() {

  return (
    <MantineProvider>
      <ToggleAuthenticationForm/>
    </MantineProvider>
  )
}

export default App
