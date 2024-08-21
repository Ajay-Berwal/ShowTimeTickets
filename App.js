import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { isLoggedIn, login, logout } from './utils/Auth';

function App() {
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = isLoggedIn();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleSearch = (searchQuery) => {
    setSearchText(searchQuery);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    login(userData);
  };

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  return (
    <div className='App'>
      <BrowserRouter>
        {/* NavBar to allow user navigation and search */}
        <NavBar
          user={user}
          onSearch={handleSearch}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

        {/* Routes for different pages */}
        <Routes>
          {/* Home page */}
          <Route
            path='/'
            element={<Home searchText={searchText} user={user} />}
          />

          {/* Movie details page */}
          <Route path='/movie/:id' element={<MovieDetails />} />

          {/* Login form */}
          <Route
            path='/login'
            element={
              <LoginForm
                onClose={() => window.history.back()}
                onLogin={handleLogin}
              />
            }
          />

          {/* Registration form */}
          <Route
            path='/register'
            element={
              <RegistrationForm onClose={() => window.history.back()} />
            }
          />
        </Routes>

        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
