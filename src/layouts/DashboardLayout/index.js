import React, { useState, lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import checkForLoggedIn from 'src/utils/checkForLoggedIn';
import { store } from 'src/AppRenderer';
import {
  name as nameOfAccount,
  sagas as accountSagas
} from 'src/views/account/AccountView/redux';

import {
  name as nameOfProduct,
  sagas as productSagas
} from 'src/views/product/ProductListView/redux';

import {
  name as nameOfManufacturer,
  sagas as manufacturerSagas
} from 'src/views/manufacturer/ManufacturerListView/redux';
import { name as nameOfCart, sagas as cartSagas } from 'src/views/carts/redux';

const AccountView = lazy(() =>
  import('../../views/account/AccountView').then(module => {
    store.injectSaga(nameOfAccount, accountSagas);
    return module;
  })
);

const ManufacturerListView = lazy(() =>
  import('../../views/manufacturer/ManufacturerListView').then(module => {
    store.injectSaga(nameOfManufacturer, manufacturerSagas);
    return module;
  })
);

const CartView = lazy(() =>
  import('../../views/carts/index').then(module => {
    store.injectSaga(nameOfCart, cartSagas);
    return module;
  })
);

const ProductContainerView = lazy(() => import('../../views/product'));
const WarehouseContainerView = lazy(() => import('../../views/warehouses'));

const SettingsView = lazy(() => import('src/views/settings/SettingsView'));
const DashboardView = lazy(() =>
  import('../../views/reports/DashboardView').then(module => {
    store.injectSaga(nameOfProduct, productSagas);
    store.injectSaga(nameOfCart, cartSagas);
    return module;
  })
);

const TopBar = lazy(() =>
  import('./TopBar').then(module => {
    store.injectSaga(nameOfAccount, accountSagas);
    return module;
  })
);

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {checkForLoggedIn() ? (
              <Switch>
                <AccountView path="/app/account" exact />
                <ManufacturerListView path="/app/manufacturers" exact />
                <DashboardView path="/app/dashboard" exact />
                <ProductContainerView path="/app/products" />
                <WarehouseContainerView path="/app/warehouses" />
                <CartView path="/app/carts" />
                <SettingsView path="/app/settings" exact />
                <Redirect to="/app/dashboard" />
              </Switch>
            ) : (
              <Redirect to="/login" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
