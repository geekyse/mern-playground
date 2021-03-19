import { isAuthorized } from './request';
import { Router } from 'express';

const request = new Request('https://www.mozilla.org/favicon.ico');

const routes: Router = Router();

test('isAuthorized', () => {
  expect(isAuthorized(1, 2, 3)).toBe(3);
});

