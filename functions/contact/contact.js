const {
    MethodNotAllowed,
    NotImplemented,
    ServerError,
} = require('../shared/response')

const handler = async function (event, context) {
    try {
        switch (event.httpMethod) {
            case 'POST':
                return NotImplemented()
            default:
                return MethodNotAllowed()
        }
    } catch (ex) {
        return ServerError()
    }
}

module.exports = { handler }
