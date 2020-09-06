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
  storage: localStorage,
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

### Accessing local/sync storage directly

react-redux prefixes storage keys with `"persist:" + config.key`. If code needs to access storage
directly instead of through Redux, it can construct the key and access the APIs like the following:

```js
// Example config passed to `persistReducer`
const key = 'localStorage';
const localStorageConfig = {
  key,
  storage: localStorage,
}

// …

chrome.storage.local.get([`persist:${key}`], (items) => {
  const rootParsed = JSON.parse(items['persist:localStorage']);
  
  // Keep in mind that each reducer must be parsed separately
  const someReducer = JSON.parse(parsed.someReducer);
  
  // `someReducer` will be the contents of the reducer of that name when last persisted
});
```

Further discussion: [Accessing storage from content_scripts directly (plain JS) #2][5]

[0]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage
[1]: https://github.com/rt2zz/redux-persist
[2]: https://www.npmjs.com/package/redux-persist-webextension-storage
[3]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/local
[4]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/sync
[5]: https://github.com/ssorallen/redux-persist-webextension-storage/issues/2
