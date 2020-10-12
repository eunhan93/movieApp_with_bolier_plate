import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "./hoc/auth";
// pages for this product
import LandingPage from "./component/views/LandingPage/LandingPage.js";
import LoginPage from "./component/views/LoginPage/LoginPage.js";
import RegisterPage from "./component/views/RegisterPage/RegisterPage.js";
import NavBar from "./component/views/NavBar/NavBar";
import Footer from "./component/views/Footer/Footer"
import MovieDetail from "./component/views/MovieDetail/MovieDetail";
import FavoritePage from "./component/views/FavoritePage/FavoritePage";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
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
    </Suspense>
  );
}

export default App;
