// Angular 2 browser
import {ELEMENT_PROBE_PROVIDERS_PROD_MODE} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';

// Angular 2

// Environment Providers
let PROVIDERS = [];

// Production
enableProdMode();

PROVIDERS = [
  ...PROVIDERS,
  ELEMENT_PROBE_PROVIDERS_PROD_MODE
];


export const ENV_PROVIDERS = [
  ...PROVIDERS
];
