import React from 'react';
import SpaceshipsListView from './SpaceshipsListView'; // Ensure this path is correct
import SpaceshipFormView from './SpaceshipFormView';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const SpaceshipPage = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={SpaceshipsListView} />
      <Route path={`${path}/create`} render={() => <SpaceshipFormView mode="create" />} />
      <Route path={`${path}/edit/:id`} render={() => <SpaceshipFormView mode="edit" />} />
    </Switch>
  );
};

export default SpaceshipPage;
