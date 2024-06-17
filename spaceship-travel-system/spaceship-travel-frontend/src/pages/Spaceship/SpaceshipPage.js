// Import necessary libraries and components
import React from 'react';
import SpaceshipsListView from './SpaceshipsListView'; // Ensure this path is correct
import SpaceshipFormView from './SpaceshipFormView';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

// Define the SpaceshipPage component
const SpaceshipPage = () => {
  const { path } = useRouteMatch(); // Get the current path from the router

  return (
    <Switch>
      {/* Route to display the list of spaceships */}
      <Route exact path={path} component={SpaceshipsListView} />
      
      {/* Route to create a new spaceship */}
      <Route path={`${path}/create`} render={() => <SpaceshipFormView mode="create" />} />
      
      {/* Route to edit an existing spaceship */}
      <Route path={`${path}/edit/:id`} render={() => <SpaceshipFormView mode="edit" />} />
    </Switch>
  );
};

export default SpaceshipPage;
