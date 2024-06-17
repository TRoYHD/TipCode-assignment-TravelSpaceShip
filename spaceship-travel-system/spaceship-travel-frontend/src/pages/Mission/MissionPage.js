// Import necessary libraries and components
import React from 'react';
import MissionsListView from './MissionsListView';
import MissionFormView from './MissionFormView';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

// Define the MissionPage component
const MissionPage = () => {
  const { path } = useRouteMatch(); // Get the current path from the router

  return (
    <Switch>
      {/* Route to display the list of missions */}
      <Route exact path={path} component={MissionsListView} />
      
      {/* Route to create a new mission */}
      <Route path={`${path}/create`} render={() => <MissionFormView mode="create" />} />
      
      {/* Route to edit an existing mission */}
      <Route path={`${path}/edit/:id`} render={() => <MissionFormView mode="edit" />} />
    </Switch>
  );
};

export default MissionPage;
