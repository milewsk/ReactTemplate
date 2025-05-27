export interface IResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface IRequest<T> {
    url : string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: T | null;
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>
    // Optional pagination parameters
    page?: number;
    pageSize?: number;
}

export interface ApiFacade {
    request<T>(request: IRequest<T>): Promise<IResponse<T>>;
    get<T>(url: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<IResponse<T>>;
    post<T>(url: string, data: T, headers?: Record<string, string>): Promise<IResponse<T>>;
    put<T>(url: string, data: T, headers?: Record<string, string>): Promise<IResponse<T>>;
    delete<T>(url: string, params?: Record<string, string | number | boolean>, headers?: Record<string, string>): Promise<IResponse<T>>;
}