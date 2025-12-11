import {
  setAuthToken,
  removeAuthToken,
  isTokenActive,
  getAccessToken,
  getCurrentUser,
  WrongCredentialsException,
  logout,
  setLogoutIfExpiredHandler,
  getToken
} from './auth';
import { tokenKey } from '../constants/config';
const userPayload = {
  _id: 'user123',
  email: 'test@example.com',
};

function createFakeJWT(expOffsetSeconds = 3600, iatOffsetSeconds = 0) {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    ...userPayload,
    iat: now + iatOffsetSeconds,
    exp: now + expOffsetSeconds,
  };
  // base64url encode
  const base64url = (obj: any) => Buffer.from(JSON.stringify(obj)).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `header.${base64url(payload)}.signature`;
}

describe('auth utils', () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllTimers();
  });

  describe('setLogoutIfExpiredHandler', () => {
    it('should call setUser(undefined) when token expires', () => {
      jest.useFakeTimers();
      const token = createFakeJWT(1); // expires in 1 second
      setAuthToken(token);
      const setUser = jest.fn();
      setLogoutIfExpiredHandler(setUser);
      jest.advanceTimersByTime(1001);
      expect(setUser).toHaveBeenCalledWith(undefined);
      jest.useRealTimers();
    });
    it('should not call setUser if token is not active', () => {
      removeAuthToken();
      const setUser = jest.fn();
      setLogoutIfExpiredHandler(setUser);
      expect(setUser).not.toHaveBeenCalled();
    });
  });

  describe('getToken', () => {
    it('should return null if no token in localStorage', () => {
      localStorage.removeItem(tokenKey);
      const result = getToken();
      expect(result).toBeNull();
    });
  });

  describe('setAuthToken', () => {
    it('should store token in localStorage', () => {
  const token = createFakeJWT();
      setAuthToken(token);
      const stored = JSON.parse(localStorage.getItem(tokenKey)!);
      expect(stored.accessToken).toBe(token);
      expect(typeof stored.expirationTimestampInMillis).toBe('number');
    });
    it('should handle invalid token', () => {
      expect(() => setAuthToken('invalid.token')).toThrow();
    });
  });

  describe('removeAuthToken', () => {
    it('should remove token from localStorage', () => {
  const token = createFakeJWT();
      setAuthToken(token);
      removeAuthToken();
      expect(localStorage.getItem(tokenKey)).toBeNull();
    });
    it('should not throw if token does not exist', () => {
      expect(() => removeAuthToken()).not.toThrow();
    });
  });

  describe('isTokenActive', () => {
    it('should return true for active token', () => {
  const token = createFakeJWT(3600, -10);
      setAuthToken(token);
      expect(isTokenActive()).toBe(true);
    });
    it('should return false for expired token', () => {
  const token = createFakeJWT(-10);
      setAuthToken(token);
      expect(isTokenActive()).toBe(false);
    });
    it('should return false if no token', () => {
      expect(isTokenActive()).toBe(false);
    });
    it('should return false if notBefore is in future', () => {
  const token = createFakeJWT(3600, 10000);
      setAuthToken(token);
      expect(isTokenActive()).toBe(false);
    });
  });

  describe('getAccessToken', () => {
    it('should return accessToken if token exists', () => {
  const token = createFakeJWT();
      setAuthToken(token);
      expect(getAccessToken()).toBe(token);
    });
    it('should return empty string if no token', () => {
      expect(getAccessToken()).toBe('');
    });
  });

  describe('getCurrentUser', () => {
    it('should return user object if token is active', () => {
  const token = createFakeJWT();
      setAuthToken(token);
      const user = getCurrentUser();
      expect(user).toBeDefined();
      expect(user!._id).toBe(userPayload._id);
      expect(user!.email).toBe(userPayload.email);
      expect(user!.active).toBe(true);
    });
    it('should return undefined if token is expired', () => {
  const token = createFakeJWT(-10);
      setAuthToken(token);
      expect(getCurrentUser()).toBeUndefined();
    });
    it('should return undefined if no token', () => {
      expect(getCurrentUser()).toBeUndefined();
    });
  });

  describe('logout', () => {
    it('should remove token and clear timer', () => {
  const token = createFakeJWT();
      setAuthToken(token);
      logout();
      expect(localStorage.getItem(tokenKey)).toBeNull();
    });
  });
});
