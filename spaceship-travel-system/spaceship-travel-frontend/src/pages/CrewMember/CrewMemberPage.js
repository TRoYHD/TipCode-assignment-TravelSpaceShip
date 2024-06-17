// Import necessary libraries and components
import React from 'react';
import CrewMembersListView from './CrewMembersListView';
import CrewMemberFormView from './CrewMemberFormView';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

// Define the CrewMemberPage component
const CrewMemberPage = () => {
  const { path } = useRouteMatch(); // Get the current path from the router

  return (
    <Switch>
      {/* Route to display the list of crew members */}
      <Route exact path={path} component={CrewMembersListView} />
      
      {/* Route to create a new crew member */}
      <Route path={`${path}/create`} render={() => <CrewMemberFormView mode="create" />} />
      
      {/* Route to edit an existing crew member */}
      <Route path={`${path}/edit/:id`} render={() => <CrewMemberFormView mode="edit" />} />
    </Switch>
  );
};

export default CrewMemberPage;
