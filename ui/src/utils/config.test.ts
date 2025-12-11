
import { getApiBaseUri } from './config';

describe('getApiBaseUri', () => {
  it('returns VITE_API_URI if VITE_BASE_URI is not set', () => {
    const env = { VITE_API_URI: 'http://api.test', VITE_BASE_URI: '' };
    expect(getApiBaseUri(env)).toBe('http://api.test');
  });

  it('returns baseUrl + /_/api if VITE_BASE_URI is set', () => {
    const env = { VITE_API_URI: 'http://api.test', VITE_BASE_URI: 'http://base.test' };
    expect(getApiBaseUri(env)).toBe('http://base.test/_/api');
  });

  it('handles missing VITE_API_URI gracefully', () => {
    const env = { VITE_BASE_URI: 'http://base.test' };
    expect(getApiBaseUri(env)).toBe('http://base.test/_/api');
  });

  it('handles missing VITE_BASE_URI and VITE_API_URI', () => {
    const env = {};
    expect(getApiBaseUri(env)).toBe(undefined);
  });
});
