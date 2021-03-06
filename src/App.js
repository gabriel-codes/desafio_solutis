import React, { useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import Results from './pages/Results/Results';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Favorites from './pages/Favorites/Favorites';
import User from './pages/User/User';
import { useDispatch } from 'react-redux';
import { activeMobile, deactivateMobile } from './store/mobile/mobile';
import NotFound from './pages/NotFound/NotFound';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    function listener() {
      const screen = window.screen.width;
      if (screen < 768) {
        dispatch(activeMobile());
      } else {
        dispatch(deactivateMobile());
      }
    }

    window.addEventListener('resize', listener);
    window.addEventListener('load', listener);

    return () => {
      window.removeEventListener('resize', listener);
      window.removeEventListener('load', listener);
    };
  }, [dispatch]);

  return (
    <div className="app width">
      <Router>
        <GlobalStyle />
        <Header />
        <main className="main">
          <Switch>
            <Route exact path="/" children={<Home />} />
            <Route exact path="/results/" children={<Results />} />
            <Route path="/results/:id" children={<Results />} />
            <Route path="/product/:id" children={<Product />} />
            <Route path="/cart/" children={<Cart />} />
            <Route path="/favorites/" children={<Favorites />} />
            <Route path="/user/" children={<User />} />
            <Route path="/*" children={<NotFound />} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
