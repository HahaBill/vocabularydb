// components/ProtectedRoute.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-state/store';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children } : { children: JSX.Element }){
  const isSigned = useSelector((state: RootState) => state.user.isSigned);
  
  if (!isSigned) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;
