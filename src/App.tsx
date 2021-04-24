import React from 'react';
import './App.css'
import { AuthenticatedApp } from './authenticated-app';
import { useAuth } from './context/auth-context';
// import { Test } from './test';
import { UnauthenticatedApp } from './unauthenticated-app';


function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
