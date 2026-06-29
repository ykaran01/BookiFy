import { getAuth } from "@clerk/express";

const requireAuth = (req, res, next) => {
    try {
        const auth = getAuth(req);

        console.log("Authorization Header:", req.headers.authorization);
        console.log("Auth:", auth);

        if (!auth.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        req.user = auth.userId;
        next();
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const requireAdmin = async (req, res, next) => {
    try {
        const auth = getAuth(req);

        if (!auth.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const user = await req.clerkClient.users.getUser(auth.userId);

        const email = user.emailAddresses?.[0]?.emailAddress;

        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: "Admin access required",
            });
        }

        req.user = auth.userId;

        next();
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export { requireAuth, requireAdmin };