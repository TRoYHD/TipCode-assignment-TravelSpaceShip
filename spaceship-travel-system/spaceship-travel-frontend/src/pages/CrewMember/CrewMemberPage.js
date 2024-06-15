import React from 'react';
import CrewMembersListView from './CrewMembersListView';
import CrewMemberFormView from './CrewMemberFormView';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const CrewMemberPage = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={CrewMembersListView} />
      <Route path={`${path}/create`} render={() => <CrewMemberFormView mode="create" />} />
      <Route path={`${path}/edit/:id`} render={() => <CrewMemberFormView mode="edit" />} />
    </Switch>
  );
};

export default CrewMemberPage;
