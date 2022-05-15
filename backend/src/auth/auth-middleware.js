const jwt = require("jsonwebtoken");

function doAuthMiddleware(req, res, next) {
    const _pleaseLoginFirst = () => res.status(401).json({ message: "Please login..." })

    const tokenField = req.headers.token;

    if (!tokenField) {
        return _pleaseLoginFirst()
    }

    const tokenFieldParts = tokenField.split(" ");
    const token = tokenFieldParts[1];

    const isJwtToken = tokenFieldParts[0] === "JWT";
    if (!isJwtToken) {
        return _pleaseLoginFirst();
    }

    const noTokenProvided = !token;
    if (noTokenProvided) {
        return _pleaseLoginFirst()
    }

    try {
        tokenPayload = jwt.verify(token, process.env.JWT_SECRET)

        const isAccessToken = tokenPayload.type === "access";
        if (!isAccessToken) {
            return _pleaseLoginFirst();
        }

        req.userClaims = tokenPayload;
        next();

    } catch (error) {
        console.log("error while verifying token", error);
        return _pleaseLoginFirst()
    }

}

module.exports = {
    doAuthMiddleware
}