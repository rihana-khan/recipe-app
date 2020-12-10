//app.js =root file
import { ThemeProvider } from 'styled-components';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
// importing css file
import './App.css';
// importing pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgetPass from './pages/ForgetPass';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import Search from './pages/Search';
import { GlobalStyle } from './globalStyles';
// importing context file
import AuthContext from './contexts/AuthContext';
//importing components
import Navbar from './components/Navigations/Navbar';

function App() {
  // useState is hooks which is used to store variables or data
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [tokenExpiration, setTokenExpiration] = useState('');
  const [theme, setTheme] = useState({ mode: 'light' });

  // useEffect is a hook which will be triggered when our app first runs
  useEffect(() => {
    const userInfoToken = JSON.parse(
      localStorage.getItem('userInfo')
    );
    const userIdLocal = JSON.parse(localStorage.getItem('userId'));
    const tokenExp = JSON.parse(
      localStorage.getItem('tokenExpiration')
    );
    if (userInfoToken && userIdLocal && tokenExp) {
      setToken(userInfoToken);
      setUserId(userIdLocal);
      setTokenExpiration(tokenExp);
    }
    const theme = JSON.parse(
      localStorage.getItem('theme')
    );
    if (theme) {
      setTheme(theme);
    } else {
      setTheme({ mode: 'light' })
    }
  }, []);
  const handleTheme = () => {
    setTheme(theme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' });
    localStorage.setItem(
      'theme',
      JSON.stringify(theme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' })
    );
  }

  const login = (token, userId, tokenExpiratopn) => {
    setToken(token);
    setUserId(userId);
    setTokenExpiration(tokenExpiratopn);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setTokenExpiration(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthContext.Provider
          value={{
            token,
            userId,
            login,
            logout,
            tokenExpiration,
          }}
        >
          <div className="App">
            <Navbar handleTheme={handleTheme}></Navbar>
            <GlobalStyle />
            <main className="main-content">
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/login' component={Login} />
                <Route path='/registration' component={Registration} />
                <Route path='/forget-password' component={ForgetPass} />
                <Route path="/add-recipe" component={AddRecipe} />
                <Route path="/users/:username" component={Profile} />
                <Route path="/search/:searchVal" component={Search} />
                <Route path="/recipes/:recipeId" exact component={RecipeDetails} />
                <Route path="/recipes/edit/:recipeId" component={EditRecipe} />
              </Switch>
            </main>
          </div>
        </AuthContext.Provider>

      </Router>
    </ThemeProvider>

  );
}

export default App;


