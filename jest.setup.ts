import '@testing-library/jest-dom';

// Polyfill MutationObserver for older jsdom
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
global.MutationObserver = class {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  constructor(callback: any) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  observe(element: any, initObject: any) {}
  takeRecords() {
    return [];
  }
};
