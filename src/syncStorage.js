/* @flow */

import createStorage, { type ReduxPersistStorage } from "./createStorage";

export default (createStorage("sync"): ReduxPersistStorage);
