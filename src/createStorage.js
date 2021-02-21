/* @flow */

export interface ReduxPersistStorage {
  +getItem: (key: string) => Promise<mixed>;
  +removeItem: (key: string) => Promise<void>;
  +setItem: (key: string, value: mixed) => Promise<void>;
}

export default function createStorage(type: "local" | "sync"): ReduxPersistStorage {
  return {
    getItem(key: string) {
      if (typeof browser !== "undefined") {
        return browser.storage[type].get(key).then((value) => value[key]);
      } else {
        return new Promise((resolve, reject) => {
          chrome.storage[type].get(key, (value) => {
            if (chrome.runtime.lastError == null) {
              // Chrome Storage returns the value in an Object of with its original key. Unwrap the
              // value from the returned Object to match the `getItem` API.
              resolve(value[key]);
            } else {
              reject();
            }
          });
        });
      }
    },
    removeItem(key: string) {
      if (typeof browser !== "undefined") {
        return browser.storage[type].remove(key);
      } else {
        return new Promise((resolve, reject) => {
          chrome.storage[type].remove(key, () => {
            if (chrome.runtime.lastError == null) {
              resolve();
            } else {
              reject(chrome.runtime.lastError);
            }
          });
        });
      }
    },
    setItem(key: string, value: mixed) {
      if (typeof browser !== "undefined") {
        return browser.storage[type].set({ [key]: value });
      } else {
        return new Promise((resolve, reject) => {
          chrome.storage[type].set({ [key]: value }, () => {
            if (chrome.runtime.lastError == null) {
              resolve();
            } else {
              reject(chrome.runtime.lastError);
            }
          });
        });
      }
    },
  };
}
