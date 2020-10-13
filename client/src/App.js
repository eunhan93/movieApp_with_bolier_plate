import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./hoc/auth";
// pages for this product
import LandingPage from "./components/views/LandingPage/LandingPage.js";
import LoginPage from "./components/views/LoginPage/LoginPage.js";
import RegisterPage from "./components/views/RegisterPage/RegisterPage.js";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer"
import MovieDetail from "./components/views/MovieDetail/MovieDetail";
import FavoritePage from "./components/views/FavoritePage/FavoritePage";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Router>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
        </Switch>
      </div>
      <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
