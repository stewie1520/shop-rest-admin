import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  colors,
  Card,
  CardContent,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import Page from 'src/components/Page';
import ProductImage from './components/ProductImage';
import ProductImageList from './components/ProductImageList';
import ProductInfo from './components/ProductInfo';
import ProductCategory from './components/ProductCategory';
import ProductToolbar from './components/ProductToolbar';
import ProductStatus from './components/ProductStatus';
import ProductDimension from './components/ProductDimesion';
import ProductTags from './components/ProductTags';
import ProductFeatures from './components/ProductFeatures';

import {
  name,
  actions as productDetailActions
} from 'src/views/product/ProductDetailView/redux';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const ProductDetail = ({
  actions,
  view,
  isFetchingProduct,
  isUpdatingProductDetail,
  isDeletingProduct,
  ...rest
}) => {
  const queries = new URLSearchParams(useLocation().search);
  const productId = queries.get('id') || null;

  useEffect(() => {
    actions.fetchProductDetail({ id: productId });
  }, []);

  const classes = useStyles();
  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Backdrop
          className={classes.backdrop}
          open={isUpdatingProductDetail || isDeletingProduct}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <ProductToolbar />
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <ProductImage actions={actions} {...rest} />
          </Grid>
          <Grid item lg={9}>
            <ProductImageList
              images={_get(view, 'imageUrls')}
              actions={actions}
            />
          </Grid>
        </Grid>
        <Box mt={2} />
        <Grid container spacing={2}>
          <Grid item lg={8}>
            <ProductInfo />
            <Box mt={3} />
            <ProductDimension />
            <Box mt={3} />
            <ProductFeatures />
          </Grid>
          <Grid item lg={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ProductCategory />
              </Grid>
              <Grid item xs={12}>
                <ProductStatus />
              </Grid>
              <Grid item xs={12}>
                <ProductTags />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...productDetailActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
);
