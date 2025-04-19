import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './slices/product';
import usersReducer from './slices/users';
import authReducer from './slices/auth';
import adminReducer from './slices/admin';
import playersBetReducer from './slices/playersBet';
import totalWinReducer  from './slices/totalwin';
import totalLossReducer from './slices/totalLoss'
import marketStatusReducer from './slices/marketStatus';
import matchStatusReducer from './slices/matchStatus';
import transactionsReducer from './slices/transaction';
import dashboardReducer from './slices/dashboardSlice';


export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

export const getTotalWinAsync = {
  key: 'date',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};


const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  admin: adminReducer,
  playersBet: playersBetReducer,
  product: persistReducer(productPersistConfig, productReducer),
  marketStatus: marketStatusReducer,
  matchStatus: matchStatusReducer,
  totalWin: totalWinReducer,
  totalLoss: totalLossReducer,
  transactions: transactionsReducer,
  dashboard:dashboardReducer
  // date: totalWinReducer(totalWin, totalWinReducer),
});

export default rootReducer;
