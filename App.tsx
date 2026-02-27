import React from 'react';
import { Route, Switch } from 'wouter';
import { SmoothScroll } from './components/SmoothScroll';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';

const App: React.FC = () => {
  return (
    <SmoothScroll>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </SmoothScroll>
  );
};

export default App;
