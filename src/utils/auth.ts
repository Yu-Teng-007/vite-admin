const TOKEN_KEY = "admin_token";
const USER_INFO_KEY = "admin_user_info";

// 获取token
export function getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || "";
}

// 设置token
export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

// 移除token
export function removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

// 获取用户信息
export function getUserInfo(): any {
    const userInfoStr = localStorage.getItem(USER_INFO_KEY);
    return userInfoStr ? JSON.parse(userInfoStr) : null;
}

// 设置用户信息
export function setUserInfo(userInfo: any): void {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

// 移除用户信息
export function removeUserInfo(): void {
    localStorage.removeItem(USER_INFO_KEY);
}

// 清除所有认证信息
export function clearAuth(): void {
    removeToken();
    removeUserInfo();
}
