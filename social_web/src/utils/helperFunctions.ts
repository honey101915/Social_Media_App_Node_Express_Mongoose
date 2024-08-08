export function ApiSuccessResponse(success: any) {
    var _success = success?.message?.en || success?.message || "Success"
    return _success;
}

export function ApiError(error: any) {
    var _error = error?.message?.en || error?.message || "Error"
    return _error;
}