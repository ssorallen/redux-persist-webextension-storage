/* @flow */

export default function createStorage(type: 'local' | 'sync') {
  return {
    getItem(key: string) {
      return new Promise((resolve, reject) => {
        chrome.storage[type].get(key, value => {
          if (chrome.runtime.lastError == null) {
            // Chrome Storage returns the value in an Object of with its original key. Unwrap the
            // value from the returned Object to match the `getItem` API.
            resolve(value[key]);
          } else {
            reject();
          }
        });
      });
    },
    removeItem(key: string) {
      return new Promise((resolve, reject) => {
        chrome.storage[type].remove(key, () => {
          if (chrome.runtime.lastError == null) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    setItem(key: string, value: mixed) {
      return new Promise((resolve, reject) => {
        chrome.storage[type].set({ [key]: value }, () => {
          if (chrome.runtime.lastError == null) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
  };
}
