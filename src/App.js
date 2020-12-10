import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { configureStore } from './redux/store';

const { store, history } = configureStore();

const DashboarLayout = lazy(() => import('src/layouts/DashboardLayout'));
const MainLayout = lazy(() => import('src/layouts/MainLayout'));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <Switch>
          <DashboarLayout path="/app" />
          <MainLayout path="/" />
        </Switch>
      </ConnectedRouter>
    </ThemeProvider>
  );
};

export default App;
export { store, history };
