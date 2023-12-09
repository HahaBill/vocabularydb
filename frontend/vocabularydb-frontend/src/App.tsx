// import './App.css'
import '@mantine/core/styles.css';
import AuthPage from './routes/auth-route/auth-page';
import { useSelector } from 'react-redux';
import { RootState } from './redux-state/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import Home from './routes/home';

function App() {
  const isSigned = useSelector((state: RootState) => state.user.isSigned);

  if(!isSigned) {
    return (
      <AuthPage/>
    )
  }

  return (
      <Home/>
  )
}

export default App
