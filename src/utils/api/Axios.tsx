import { ApiFacade, IRequest, IResponse } from "./Facade";

    const axios = require('axios');

    const apiClient = axios.create({
        baseURL: 'https://api.example.com',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

export class AxiosFacade implements ApiFacade {
    async request<T>(request: IRequest<T>): Promise<IResponse<T>> {
        try {
            const response = await apiClient({
                url: request.url,
                method: request.method,
                data: request.data,
                params: request.params,
                headers: request.headers,
            });
            return {
                code: response.status,
                message: response.statusText,
                data: response.data as T,
            };
        } catch (error) {
            throw new Error(`API request failed: ${error}`);
        }
    }

    async get<T>(url: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<IResponse<T>> {
        return this.request<T>({ url, method: 'GET', params, headers,  });
    }

    async post<T>(url: string, data: T, headers?: Record<string, string>): Promise<IResponse<T>> {
        return this.request<T>({ url, method: 'POST', data, headers });
    }

    async put<T>(url: string, data: T, headers?: Record<string, string>): Promise<IResponse<T>> {
        return this.request<T>({ url, method: 'PUT', data, headers });
    }

    async delete<T>(url: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<IResponse<T>> {
        return this.request<T>({ url, method: 'DELETE', params, headers, data: null });
}
