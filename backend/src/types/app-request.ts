import {Request} from 'express';
import {IncomingHttpHeaders} from 'http';

import {IBaseAppUser} from './app-user';

export interface IBaseAppHeaders extends IncomingHttpHeaders {
  // https://support.cloudflare.com/hc/en-us/articles/200168236-Configuring-Cloudflare-IP-Geolocation
  'cf-ipcountry'?: string;
  // https://support.cloudflare.com/hc/en-us/articles/200170986-How-does-Cloudflare-handle-HTTP-Request-headers-
  'x-forwarded-proto'?: string;
  'x-forwarded-for'?: string;
  'x-forwarded-port'?: string;
  'x-real-ip'?: string;
  'cf-connecting-ip'?: string;
  'x-country-code'?: string;
  'x-currency'?: string;
  'x-user-currency'?: string;
  'x-language'?: string;
  'x-connecting-ip'?: string;
  'x-true-client-ip'?: string;
}

export type AppNameType = 'web-www' | 'web-catalog-pim' | 'web-seller-center' | 'web-buyer-center' | 'web-hub' | 'web-external';

export interface IBaseAppHeaders {
  'x-is-internal-request'?: string;
  // APP Name
  'x-app-name'?: AppNameType;
  // API Keys Portal
  'x-api-token'?: string;
  // user generated jwt
  'x-jwt-token'?: string;
  // decoded id from jwt
  'x-auth-user-id'?: string;
  'x-auth-supplier-company-id'?: string;
  'x-auth-buyer-company-id'?: string;
}

export interface IBaseAppRequest extends Request {
  headers: IBaseAppHeaders;

  appName?: string;
  isSellerPortal?: boolean;
  isBuyerPortal?: boolean;

  // jwt mw
  userJwtToken?: string;
  userJwtDecoded?: IBaseAppUser | object | string | undefined;
  userId?: string;
  supplierId?: string;
  buyerId?: string;
  supplierCompanyId?: string;
  buyerCompanyId?: string;

  // ip mw
  userIp: string;

  // language mw
  runtimeTLD: string;
  runtimeSubDomain: string;
  runtimeFullDomain: string;
  runtimeHost: string;
  runtimeProto: string;
  runtimePort: string;
  userIpCountry: string;
  language: 'en' | 'ar';
  currency: string;
  userCurrency: string;
}
