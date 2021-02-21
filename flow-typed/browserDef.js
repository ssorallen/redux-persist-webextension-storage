// Types for browser extension storage
// See https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage

interface StorageChange {
  newValue: ?mixed;
  oldValue: ?mixed;
}

type OnChangedListener = (
  changes: { [key: string]: StorageChange },
  areaName: "local" | "managed" | "sync"
) => void;

declare class StorageArea {
  clear(): Promise<void>;
  get(key: string | Array<string>): Promise<{ [key: string]: mixed }>;
  getBytesInUse(): number;
  onChanged: {
    addListener(callback: OnChangedListener): void,
    hasListener(listener: OnChangedListener): boolean,
    removeListener(listener: OnChangedListener): void,
  };
  remove(key: string): Promise<void>;
  set({ [key: string]: mixed }): Promise<void>;
}

interface Browser {
  storage: {
    local: StorageArea,
    sync: StorageArea,
  };
}

declare var browser: Browser;
