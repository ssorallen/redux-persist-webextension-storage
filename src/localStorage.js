/* @flow */

import createStorage, { type ReduxPersistStorage } from "./createStorage";

export default (createStorage("local"): ReduxPersistStorage);
