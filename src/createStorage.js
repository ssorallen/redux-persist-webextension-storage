/* @flow */

export default function createStorage(type: 'local' | 'sync') {
  return {
    getItem(key: string) {
      return new Promise((resolve, reject) => {
        if (typeof chrome !== 'undefined') {
          chrome.storage[type].get(key, (value) => {
            if (chrome.runtime.lastError == null) {
              // Chrome Storage returns the value in an Object of with its original key. Unwrap the
              // value from the returned Object to match the `getItem` API.
              resolve(value[key]);
            } else {
              reject();
            }
          });
        } else {
          browser.storage[type]
            .get(key)
            .then((value) => {
              resolve(value[key]);
            })
            .catch((e) => reject(e));
        }
      });
    },
    removeItem(key: string) {
      return new Promise((resolve, reject) => {
        if (typeof chrome !== 'undefined') {
          chrome.storage[type].remove(key, () => {
            if (chrome.runtime.lastError == null) {
              resolve();
            } else {
              reject();
            }
          });
        } else {
          browser.storage[type]
            .remove(key)
            .then(resolve)
            .catch((e) => reject(e));
        }
      });
    },
    setItem(key: string, value: mixed) {
      return new Promise((resolve, reject) => {
        if (typeof chrome !== 'undefined') {
          chrome.storage[type].set({ [key]: value }, () => {
            if (chrome.runtime.lastError == null) {
              resolve();
            } else {
              reject();
            }
          });
        } else {
          browser.storage[type]
            .set({ [key]: value })
            .then(resolve)
            .catch((e) => reject(e));
        }
      });
    },
  };
}
