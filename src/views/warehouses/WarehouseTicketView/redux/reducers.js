import freeze from 'deep-freeze';
import { handleActions } from 'redux-actions';
import * as actions from './actions';
import _find from 'lodash/find';
import _unionBy from 'lodash/unionBy';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _findIndex from 'lodash/findIndex';
import _isEmpty from 'lodash/isEmpty';

export const name = 'WarehouseTicket';

const makeInitialState = () => {
  return {
    newWarehouseTransaction: {
      manufacturerId: 0,
      warehouseTransactionItems: [],
      description: ''
    }
  };
};

const initialStates = freeze({
  tableDisplay: {
    limit: 10,
    page: 0,
    count: 0
  },
  searchForName: '',
  warehouseTransactions: [],
  selectedWarehouseTransactionType: 0, // import
  isFetchingWarehouseTransaction: false,
  fetchingWarehouseTransactionFail: false,
  fetchWarehouseTransactionFailMessage: '',
  isFetchingDetailWarehouseTransaction: false,
  fetchingDetailWarehouseTransactionFail: false,
  fetchDetailWarehouseTransactionFailMessage: '',
  manufacturers: [],
  products: [],
  isSendingToServer: false,
  isSendingToServerFail: false,
  sendToServerFailMessage: '',
  warehouseTransaction: {
    id: 0,
    transactionType: 0,
    createdAt: '2020-12-26T05:52:53.9385622',
    status: 0,
    createdBy: {},
    description: '',
    manufacturer: {},
    warehouseTransactionItems: []
  },
  ...makeInitialState()
});

export default handleActions(
  {
    [actions.changeTabDisplay]: (state, action) => {
      return freeze({
        ...state,
        selectedWarehouseTransactionType: action.payload.type,
        isFetchingWarehouseTransaction: true,
        fetchingWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: '',
        tableDisplay: {
          ...state.tableDisplay,
          limit: action.payload.fetchParam.perpage,
          page: action.payload.fetchParam.page
        }
      });
    },
    [actions.fetchWarehouseTransaction]: (state, action) => {
      return freeze({
        ...state,
        isFetchingWarehouseTransaction: true,
        fetchingWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.fetchWarehouseTransactionFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingWarehouseTransaction: false,
        fetchingWarehouseTransactionFail: true,
        fetchWarehouseTransactionFailMessage: action.payload.message
      });
    },
    [actions.fetchWarehouseTransactionSuccess]: (state, action) => {
      return freeze({
        ...state,
        isFetchingWarehouseTransaction: false,
        fetchingWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: '',
        warehouseTransactions: action.payload.data,
        tableDisplay: {
          ...state.tableDisplay,
          page: action.payload.pagination.currentPage - 1,
          count: action.payload.pagination.count
        }
      });
    },
    [actions.setPage]: (state, action) => {
      return freeze({
        ...state,
        tableDisplay: {
          ...state.tableDisplay,
          page: action.payload.fetchParam.page
        },
        isFetchingWarehouseTransaction: true,
        fetchWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.setLimit]: (state, action) => {
      return freeze({
        ...state,
        tableDisplay: {
          ...state.tableDisplay,
          limit: action.payload.fetchParam.perpage
        },
        isFetchingWarehouseTransaction: true,
        fetchWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.setSearchForName]: (state, action) => {
      return freeze({
        ...state,
        searchForName: action.payload.name,
        isFetchingWarehouseTransaction: true,
        fetchWarehouseTransactionFail: false,
        fetchWarehouseTransactionFailMessage: ''
      });
    },
    [actions.fetchManufacturers]: (state, action) => {
      return freeze({
        ...state,
        manufacturers: []
      });
    },
    [actions.fetchManufacturersSuccess]: (state, action) => {
      return freeze({
        ...state,
        manufacturers: action.payload.data
      });
    },
    [actions.fetchManufacturersFail]: (state, action) => {
      return freeze({
        ...state,
        manufacturers: []
      });
    },
    [actions.clearManufacturers]: (state, action) => {
      const selectedManufacturerId =
        state.newWarehouseTransaction.manufacturerId;
      return freeze({
        ...state,
        manufacturers: state.manufacturers.filter(
          m => m.id === selectedManufacturerId
        )
      });
    },
    [actions.selectManufacturer]: (state, action) => {
      if (_isEmpty(action.payload)) {
        return freeze({
          ...state,
          manufacturers: [],
          newWarehouseTransaction: {
            ...state.newWarehouseTransaction,
            manufacturer: null,
            manufacturerId: 0
          }
        });
      } else {
        const selectedManufacturer = _find(
          _get(state, 'manufacturers', []),
          m => m.id === action.payload.id
        );
        return freeze({
          ...state,
          newWarehouseTransaction: {
            ...state.newWarehouseTransaction,
            manufacturer: selectedManufacturer,
            manufacturerId: action.payload.id
          }
        });
      }
    },
    [actions.changeDescription]: (state, action) => {
      return freeze({
        ...state,
        newWarehouseTransaction: {
          ...state.newWarehouseTransaction,
          description: action.payload
        }
      });
    },
    [actions.fetchProducts]: (state, action) => {
      return freeze({
        ...state,
        products: []
      });
    },
    [actions.fetchProductsSuccess]: (state, action) => {
      return freeze({
        ...state,
        products: action.payload.data
      });
    },
    [actions.fetchProductsFail]: (state, action) => {
      return freeze({
        ...state,
        products: []
      });
    },
    [actions.clearProducts]: (state, action) => {
      return freeze({
        ...state,
        products: []
      });
    },
    [actions.selectProduct]: (state, action) => {
      const newProducts = JSON.parse(
        JSON.stringify(action.payload.newProducts)
      );
      newProducts.map(p => {
        const existedProduct = _find(
          _get(state, 'newWarehouseTransaction.warehouseTransactionItems', []),
          existedProduct => existedProduct.id === p.id
        );
        if (existedProduct) {
          p.quantity = Number(existedProduct.quantity);
          p.cost = existedProduct.cost;
        } else {
          p.quantity = 1;
        }
      });

      return freeze({
        ...state,
        newWarehouseTransaction: {
          ...state.newWarehouseTransaction,
          warehouseTransactionItems: newProducts
        }
      });
    },
    [actions.deleteItem]: (state, action) => {
      const existedProducts = _get(
        state,
        'newWarehouseTransaction.warehouseTransactionItems',
        []
      );
      const existedProductIndex = _findIndex(
        existedProducts,
        existedProduct => existedProduct.id === action.payload.id
      );

      let newProducts;

      if (existedProductIndex === existedProducts.length - 1) {
        newProducts = [...existedProducts.slice(0, existedProductIndex)];
      } else {
        newProducts = [
          ...existedProducts.slice(0, existedProductIndex),
          ...existedProducts.slice(
            existedProductIndex + 1,
            existedProducts.length
          )
        ];
      }

      return freeze({
        ...state,
        newWarehouseTransaction: {
          ...state.newWarehouseTransaction,
          warehouseTransactionItems: newProducts
        }
      });
    },
    [actions.changeItemQuantity]: (state, action) => {
      const existedProducts = _get(
        state,
        'newWarehouseTransaction.warehouseTransactionItems',
        []
      );
      const existedProductIndex = _findIndex(
        existedProducts,
        existedProduct => existedProduct.id === action.payload.id
      );

      const modifiedProduct = JSON.parse(
        JSON.stringify(existedProducts[existedProductIndex])
      );
      modifiedProduct.quantity = Number(
        action.payload.quantity < 1 ? 1 : action.payload.quantity
      );

      let newProducts;

      if (existedProductIndex === existedProducts.length - 1) {
        newProducts = [
          ...existedProducts.slice(0, existedProductIndex),
          modifiedProduct
        ];
      } else {
        newProducts = [
          ...existedProducts.slice(0, existedProductIndex),
          modifiedProduct,
          ...existedProducts.slice(
            existedProductIndex + 1,
            existedProducts.length
          )
        ];
      }

      return freeze({
        ...state,
        newWarehouseTransaction: {
          ...state.newWarehouseTransaction,
          warehouseTransactionItems: newProducts
        }
      });
    },
    [actions.changeItemCost]: (state, action) => {
      const existedProducts = _get(
        state,
        'newWarehouseTransaction.warehouseTransactionItems',
        []
      );
      const existedProductIndex = _findIndex(
        existedProducts,
        existedProduct => existedProduct.id === action.payload.id
      );

      const modifiedProduct = JSON.parse(
        JSON.stringify(existedProducts[existedProductIndex])
      );
      modifiedProduct.cost = action.payload.cost < 0 ? 0 : action.payload.cost;

      let newProducts;

      if (existedProductIndex === existedProducts.length - 1) {
        newProducts = [
          ...existedProducts.slice(0, existedProductIndex),
          modifiedProduct
        ];
      } else {
        newProducts = [
          ...existedProducts.slice(0, existedProductIndex),
          modifiedProduct,
          ...existedProducts.slice(
            existedProductIndex + 1,
            existedProducts.length
          )
        ];
      }

      return freeze({
        ...state,
        newWarehouseTransaction: {
          ...state.newWarehouseTransaction,
          warehouseTransactionItems: newProducts
        }
      });
    },
    [actions.clearNewData]: (state, action) => {
      return freeze({
        ...state,
        ...makeInitialState()
      });
    },
    [actions.createNewWarehouseTransaction]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: true,
        sendToServerFailMessage: '',
        isSendingToServerFail: false
      });
    },
    [actions.createNewWarehouseTransactionSuccess]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        sendToServerFailMessage: '',
        isSendingToServerFail: false
      });
    },
    [actions.createNewWarehouseTransactionFail]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        sendToServerFailMessage: action.payload.message,
        isSendingToServerFail: true
      });
    },
    [actions.fetchDetailWarehouseTransaction]: (state, action) => {
      return freeze({
        ...state,
        isFetchingDetailWarehouseTransaction: true,
        fetchingDetailWarehouseTransactionFail: false,
        fetchDetailWarehouseTransactionFailMessage: ''
      });
    },
    [actions.fetchDetailWarehouseTransactionFail]: (state, action) => {
      return freeze({
        ...state,
        isFetchingDetailWarehouseTransaction: false,
        fetchingDetailWarehouseTransactionFail: true,
        fetchDetailWarehouseTransactionFailMessage: action.payload.message
      });
    },
    [actions.fetchDetailWarehouseTransactionSuccess]: (state, action) => {
      return freeze({
        ...state,
        isFetchingDetailWarehouseTransaction: false,
        fetchingDetailWarehouseTransactionFail: false,
        fetchDetailWarehouseTransactionFailMessage: '',
        warehouseTransaction: action.payload.data
      });
    },
    [actions.confirmWarehouseTransaction]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: true,
        sendToServerFailMessage: '',
        isSendingToServerFail: false
      });
    },
    [actions.confirmWarehouseTransactionFail]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        sendToServerFailMessage: action.payload.message,
        isSendingToServerFail: true
      });
    },
    [actions.confirmWarehouseTransactionSuccess]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        sendToServerFailMessage: '',
        isSendingToServerFail: false,
        warehouseTransaction: action.payload.data
      });
    },
    [actions.cancelWarehouseTransaction]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: true,
        sendToServerFailMessage: '',
        isSendingToServerFail: false
      });
    },
    [actions.cancelWarehouseTransactionFail]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        sendToServerFailMessage: action.payload.message,
        isSendingToServerFail: true
      });
    },
    [actions.cancelWarehouseTransactionSuccess]: (state, action) => {
      return freeze({
        ...state,
        isSendingToServer: false,
        sendToServerFailMessage: '',
        isSendingToServerFail: false,
        warehouseTransaction: {}
      });
    }
  },
  initialStates
);
