import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Dashboard />
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
