import { createAction } from 'redux-actions';
import * as CONST from './constants';

export const changeTabDisplay = createAction(CONST.HANDLE_CHANGE_TAB_DISPLAY);
export const fetchWarehouseTransaction = createAction(
  CONST.HANDLE_FETCH_WAREHOUSE_TRANSACTION
);
export const fetchWarehouseTransactionFail = createAction(
  CONST.HANDLE_FETCH_WAREHOUSE_TRANSACTION_FAIL
);
export const fetchWarehouseTransactionSuccess = createAction(
  CONST.HANDLE_FETCH_WAREHOUSE_TRANSACTION_SUCCESS
);

export const setPage = createAction(CONST.HANDLE_SET_PAGE);
export const setLimit = createAction(CONST.HANDLE_SET_LIMIT);
export const setSearchForName = createAction(CONST.HANDLE_SET_SEARCH_FOR_NAME);
export const clearManufacturers = createAction(
  CONST.HANDLE_CLEAR_MANUFACTURERS
);
export const fetchManufacturers = createAction(
  CONST.HANDLE_FETCH_MANUFACTURERS
);
export const fetchManufacturersSuccess = createAction(
  CONST.HANDLE_FETCH_MANUFACTURERS_SUCCESS
);
export const fetchManufacturersFail = createAction(
  CONST.HANDLE_FETCH_MANUFACTURERS_FAIL
);

export const selectManufacturer = createAction(
  CONST.HANDLE_SELECT_MANUFACTURER
);

export const clearProducts = createAction(CONST.HANDLE_CLEAR_PRODUCTS);
export const fetchProducts = createAction(CONST.HANDLE_FETCH_PRODUCTS);
export const fetchProductsSuccess = createAction(
  CONST.HANDLE_FETCH_PRODUCTS_SUCCESS
);
export const fetchProductsFail = createAction(CONST.HANDLE_FETCH_PRODUCTS_FAIL);

export const selectProduct = createAction(CONST.HANDLE_SELECT_PRODUCT);
export const changeItemQuantity = createAction(
  CONST.HANDLE_CHANGE_ITEM_QUANTITY
);
export const deleteItem = createAction(CONST.HANDLE_DELETE_ITEM);
export const changeItemCost = createAction(CONST.HANDLE_CHANGE_ITEM_COST);
