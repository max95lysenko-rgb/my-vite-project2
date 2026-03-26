import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <div style={styles.app}>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

const styles: Record<string, React.CSSProperties> = {
  app: {
    backgroundColor: '#121212',
    minHeight: '100vh',
    color: 'white',
    fontFamily: 'sans-serif'
  }
};

export default App;