import jwt_decode from 'jwt-decode';
import request from 'superagent';
import { ApiResponse } from 'services/networking/types';

const backendBaseUrl = process.env.REACT_APP_API_BASE_URL ?? '';

interface AccessToken {
  exp: number;
}

function tokenHasExpired(token: AccessToken): boolean {
  if (!token.exp) return true;

  // Less than 10 seconds remaining => token has expired
  const now = new Date().getTime() / 1000;
  return token.exp - now < 10;
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

class Client {
  baseUrl: string;
  withCredentials: boolean;
  agent: request.SuperAgentStatic & request.Request;
  tokenKey = 'token';

  constructor(baseUrl: string, withCredentials = true) {
    this.baseUrl = baseUrl;
    this.withCredentials = withCredentials;
    this.agent = request.agent();
    this.agent.accept('application/json');
    if (withCredentials) {
      this.agent.withCredentials();
    }
  }

  async request<ReturnType>(
    method: Method,
    endpoint: string,
    data: Record<string, unknown> | null = null,
    checkToken = true,
  ): Promise<ApiResponse<ReturnType>> {
    if (this.withCredentials) {
      // Checking token validity, refreshing it if necessary.
      if (checkToken) await this.checkToken();
    }

    const url = /^https?:\/\//.test(endpoint) ? endpoint : `${this.baseUrl}${endpoint}`;
    let promise = this.agent[method](url);

    const token = this.getToken();
    if (token !== null && this.withCredentials) {
      promise = promise.set('Authorization', `Bearer ${token}`);
    }

    if (['post', 'put', 'patch'].includes(method) && data) {
      promise = promise.send(data);
    }

    return promise;
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  updateToken(token: string) {
    return localStorage.setItem(this.tokenKey, token);
  }

  /**
   * This function assess the access token is still valid, if not it refreshes it.
   * In case of error during the refresh process it disconnects the user and redirects to the login page.
   */
  async checkToken() {
    const token = this.getToken();

    // There was no token to begin with, nothing to check.
    if (token === null) return;

    let parsedToken;
    try {
      parsedToken = jwt_decode<AccessToken>(token);
    } catch {
      this.updateToken('');
      return;
    }

    if (tokenHasExpired(parsedToken)) {
      try {
        await this.refreshToken();
      } catch (e) {
        // Token was invalid, logging out the user.
        this.updateToken('');
        // LOGOUT
      }
    }
  }

  get<ReturnType>(endpoint: string) {
    return this.request<ReturnType>('get', endpoint);
  }

  post<ReturnType>(endpoint: string, data: Record<string, unknown>) {
    return this.request<ReturnType>('post', endpoint, data);
  }

  put(endpoint: string, data: Record<string, unknown>) {
    return this.request('put', endpoint, data);
  }

  async login(data: Record<string, unknown>) {
    const {
      body: { access: fetchedToken },
    } = await this.post<string>('/auth/jwt/create', data);
    const token: string = fetchedToken;
    if (token !== undefined) this.updateToken(token);
    return token;
  }

  async logout() {
    return this.post('/auth/jwt/logout', {});
  }

  async refreshToken() {
    const {
      body: { access: refreshToken },
    } = await this.request<string>('post', '/auth/jwt/refresh', {}, false);
    this.updateToken(refreshToken);
  }
}

const client = new Client(backendBaseUrl);
export const githubApiClient = new Client('https://api.github.com', false);

export default client;
