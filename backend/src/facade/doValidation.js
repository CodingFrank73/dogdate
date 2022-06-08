const { validationResult } = require("express-validator");

function doValidation(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            err: {
                message: "There was an error with your request.",
                validationErrors: errors.array()
            }
        })
        return
    }

    next()
}

module.exports = {
    doValidation
}