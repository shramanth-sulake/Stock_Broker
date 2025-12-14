import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const { currentUser } = useAuth();

  // Simple routing based on Auth State
  return currentUser ? <Dashboard /> : <Login />;
}

export default App;
