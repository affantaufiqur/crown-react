import { compose, createStore, applyMiddleware } from 'redux'
import { rootReducer } from './root-reducer'
import { persistStore, persistReducer } from 'redux-persist'
import { rootSaga } from './root-saga'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()
const middleWares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(Boolean)
const composeEchancers = compose(applyMiddleware(...middleWares))
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composeEchancers)
export const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)
