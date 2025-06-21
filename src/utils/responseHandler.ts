/**
 * 响应数据处理工具
 * 统一处理后端响应格式和 Mock 数据格式
 */

// 后端统一响应格式
export interface ApiResponse<T = any> {
    code: number;
    message: string;
    data?: T;
}

// 分页响应格式
export interface PaginatedResponse<T = any> {
    total: number;
    page: number;
    pageSize: number;
    list: T[];
}

/**
 * 判断是否为后端统一响应格式
 * @param response 响应数据
 */
export function isApiResponse(response: any): response is ApiResponse {
    return (
        typeof response === "object" &&
        response !== null &&
        typeof response.code === "number" &&
        typeof response.message === "string"
    );
}

/**
 * 处理响应数据，统一返回格式
 * @param response 原始响应数据
 */
export function handleResponse<T>(response: any): T {
    if (isApiResponse(response)) {
        // 后端统一格式
        if (response.code === 200) {
            return response.data as T;
        } else {
            throw new Error(response.message || "请求失败");
        }
    } else {
        // Mock 数据或其他格式
        return response as T;
    }
}

/**
 * 创建成功响应（用于 Mock 数据）
 * @param data 响应数据
 * @param message 响应消息
 */
export function createSuccessResponse<T>(data: T, message = "success"): ApiResponse<T> {
    return {
        code: 200,
        message,
        data,
    };
}

/**
 * 创建错误响应（用于 Mock 数据）
 * @param code 错误码
 * @param message 错误消息
 */
export function createErrorResponse(code: number, message: string): ApiResponse {
    return {
        code,
        message,
    };
}

/**
 * 创建分页响应（用于 Mock 数据）
 * @param list 数据列表
 * @param total 总数
 * @param page 当前页
 * @param pageSize 每页大小
 */
export function createPaginatedResponse<T>(
    list: T[],
    total: number,
    page = 1,
    pageSize = 10
): ApiResponse<PaginatedResponse<T>> {
    return createSuccessResponse({
        total,
        page,
        pageSize,
        list,
    });
}

/**
 * 处理错误响应
 * @param error 错误对象
 */
export function handleError(error: any): never {
    let message = "请求失败";
    
    if (error?.response?.data) {
        const responseData = error.response.data;
        if (isApiResponse(responseData)) {
            message = responseData.message || message;
        } else if (typeof responseData === "string") {
            message = responseData;
        }
    } else if (error?.message) {
        message = error.message;
    }
    
    throw new Error(message);
}

/**
 * 响应状态码常量
 */
export const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * 业务状态码常量
 */
export const BUSINESS_CODE = {
    SUCCESS: 200,
    PARAM_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
} as const;
