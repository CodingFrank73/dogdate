
function imageBufferToBase64(imgBuffer, mimetype) {
    return `data:${mimetype};base64,${imgBuffer.toString('base64')}`
}

module.exports = {
    imageBufferToBase64
}