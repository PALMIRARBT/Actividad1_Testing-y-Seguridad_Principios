export function getApiBaseUri(env?: { VITE_BASE_URI?: string; VITE_API_URI?: string }) {
  let source;
  if (env) {
    source = env;
  } else if (typeof window !== 'undefined' && (window as any).VITE_BASE_URI) {
    source = {
      VITE_BASE_URI: (window as any).VITE_BASE_URI,
      VITE_API_URI: (window as any).VITE_API_URI
    };
  } else {
    source = {};
  }
  const baseUrl = source.VITE_BASE_URI;
  let apiBaseUrl = source.VITE_API_URI;
  if (baseUrl) {
    apiBaseUrl = baseUrl + '/_/api';
  }
  return apiBaseUrl;
}

export const API_BASE_URI = getApiBaseUri();
