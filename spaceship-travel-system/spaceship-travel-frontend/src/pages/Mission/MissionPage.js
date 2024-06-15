import React from 'react';
import MissionsListView from './MissionsListView';
import MissionFormView from './MissionFormView';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const MissionPage = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={MissionsListView} />
      <Route path={`${path}/create`} render={() => <MissionFormView mode="create" />} />
      <Route path={`${path}/edit/:id`} render={() => <MissionFormView mode="edit" />} />
    </Switch>
  );
};

export default MissionPage;
