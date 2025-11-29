import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth && auth.split(" ")[1];

    if (!token) {
        return res.status(401).send({
            ok: false,
            message: "No Token Provided"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).send({
                ok: false,
                message: "Invalid or expired token"
            });
        }

        req.user = decoded;
        next();
    });
};