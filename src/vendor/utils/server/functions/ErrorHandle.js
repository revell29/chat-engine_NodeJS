export function ResponseMessage(status, res, message, data = null) {
    if (status === 200) {
        res.status(status).send({ message: message, data: data });
    } else if (status === 500) {
        res.status(status).send({ message: message, data: data });
    }
}
