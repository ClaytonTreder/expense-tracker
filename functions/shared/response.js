function Ok(json) {
    return {
        statusCode: 200,
        body: JSON.stringify({ ...json, message: json?.message ?? 'Ok' }),
    }
}
function Unauthorized(json) {
    return {
        statusCode: 401,
        body: JSON.stringify({
            ...json,
            message: json?.message ?? 'Unauthorized request',
        }),
    }
}
function ServerError(json) {
    return {
        statusCode: 500,
        body: JSON.stringify({
            ...json,
            message: json?.message ?? 'Internal Server Error',
        }),
    }
}
function NotImplemented(json) {
    return {
        statusCode: 501,
        body: JSON.stringify({
            ...json,
            message: json?.message ?? 'Not Implemented',
        }),
    }
}
function NotFound(json) {
    return {
        statusCode: 404,
        body: JSON.stringify({
            ...json,
            message: json?.message ?? 'Resource Not Found',
        }),
    }
}

function MethodNotAllowed(json) {
    return {
        statusCode: 405,
        body: JSON.stringify({
            ...json,
            message:
                json?.message ??
                'Unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE',
        }),
    }
}
function BadRequest(json) {
    return {
        statusCode: 400,
        body: JSON.stringify({
            ...json,
            message: json?.message ?? 'Bad Request',
        }),
    }
}

module.exports = {
    Ok,
    Unauthorized,
    ServerError,
    NotFound,
    MethodNotAllowed,
    BadRequest,
    NotImplemented,
}
