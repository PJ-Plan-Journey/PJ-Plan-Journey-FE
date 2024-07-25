// 2024.07.23 엄태정
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import useUserStore from '../zustands/bearStore';

const Routes = () => {
  const user = useUserStore((state) => state.user);

  return (
    <Router>
      <Switch>
        {!user ? (
          <>
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={LoginPage} />
          </>
        ) : (
          <>
            <Route path="/profile" component={ProfilePage} />
            <Route path="/" component={ProfilePage} />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default Routes;
