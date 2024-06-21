const jwt =require('jsonwebtoken')
const {db} = require('../database/database')


const getProfile = async (req, res) => {
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const findContribCount = "SELECT COUNT(*) AS contribCount FROM books WHERE id = ?";
    const ref = req.cookies.rfs;

    if (!ref) return res.json({ error: "Invalid Token" });

    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.json({ error: "Invalid ID" });

        try {
            const [rows] = await db.promise().query(findID, [user.studID]);
            const isUser = rows.length > 0 ? rows[0] : null;

            if (!isUser) return res.json({ error: "Invalid ID" });

            if (isUser.profile) {
                isUser.profile = isUser.profile.toString('base64');
            }

            const [contribResult] = await db.promise().query(findContribCount, [isUser.id]);
            const contribCount = contribResult.length > 0 ? contribResult[0].contribCount : 0;

            return res.json({ valid: true, data_value: isUser, contribution_count: contribCount });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });
}

const logout = async(req, res)=>{
    res.clearCookie('acs', { path: '/' });
    res.clearCookie('rfs', { path: '/' });
    return res.json({ valid: true });
}


module.exports = {getProfile, logout}