import { getAuth, clerkClient } from "@clerk/express"
const requireAuth = async (req, res, next) => {
    try {
        const {userId} = getAuth(req);
      
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }
        req.user = userId
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }

    
};


const requireAdmin = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }

        const user = await clerkClient.users.getUser(userId);
        const email = user.emailAddresses[0].emailAddress;
        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(400).json({
                success: false,
                message: 'Admin is recquired'
            })
        }
        
        req.user = userId;
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { requireAuth, requireAdmin };
