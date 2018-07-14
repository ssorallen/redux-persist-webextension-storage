# redux-persist-webextension-storage
A [WebExtension Storage][0] storage engine for [redux-persist][1].

## Installation

Add the [redux-persist-webextension-storage][2] NPM package via NPM or Yarn:

```bash
$ yarn add redux-persist-webextension-storage
```

## Usage

There are separate storage engines for [local storage][3] and [sync storage][4]. Import the one you need,
or both, and pass them as storage engines when configuring your store.

```js
// configureStore.js

import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { localStorage, syncStorage } from 'redux-persist-webextension-storage'

import localStorageReducer from './localStorageReducer';
import syncStorageReducer from './syncStorageReducer';

const localStorageConfig = {
  key: 'localStorage',
  storage: syncStorage,
}

const syncStorageConfig = {
  key: 'syncStorage',
  storage: syncStorage,
}

// Persist each of the storage areas under different keys and with different storage engines.
const rootReducer = combineReducers({
  localStorage: persistReducer(localStorageConfig, localStorageReducer),
  syncStorage: persistReducer(syncStorageConfig, syncStorageReducer),
})

export default () => {
  const store = createStore(rootReducer)
  const persistor = persistStore(store)
  return { store, persistor }
}
```

[0]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage
[1]: https://github.com/rt2zz/redux-persist
[2]: https://www.npmjs.com/package/redux-persist-webextension-storage
[3]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/local
[4]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/sync
