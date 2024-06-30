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


const allUser = async (req, res) => {
    const findID = "SELECT * FROM users where stud_id = ?";
    const get_all = "SELECT * FROM users where role = 'admin'";
    const getuser = "SELECT * FROM users where role = 'user'"
    const ref = req.cookies.rfs;

    if (!ref) return res.json({ error: "Invalid Token" });

    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.json({ error: "Invalid Id" });

        try {
            const [isUser] = await db.promise().query(findID, [user.studID]);
            if (!isUser) return res.json({ error: "Invalid ID" });

            const [getAll] = await db.promise().query(get_all);
            if (!getAll) return res.json({ error: "Can't retrieve" });

            getAll.forEach(user => {
                if (user.profile) {
                    user.profile = Buffer.from(user.profile).toString('base64');
                }
            });

            const [getUser] = await db.promise().query(getuser)
            if(!getUser) return res.json({error:"Can't retreive"})
            
            getUser.forEach(user=>{
                if(user.profile){
                    user.profile = Buffer.from(user.profile).toString('base64')
                }
            })

            return res.json({ valid: true, getAll, getUser });
        } catch (error) {
            return res.sendStatus(500);
        }
    });
};

const addAdmin = async (req, res) => {
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const insertDB = "INSERT INTO users(email, user_password, stud_id, fullname, role) VALUES (?, ?, ?, ?, ?)";
  
    const { adminName, adminID, adminEmail } = req.body;
    console.log(req.adminName)
    const ref = req.cookies.rfs;
  
    if (!ref) return res.json({ error: "Invalid Token" });
  
    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.json({ error: "Invalid Token" });
      }
  
      try {
        const [isUser] = await db.promise().query(findID, [user.studID]);
  
        if (isUser.length === 0) {
          console.error("User not found for studID:", user.studID);
          return res.json({ error: "Not a user" });
        }
  
        const role = isUser[0].role;
        if (role !== 'xxxx') {
          console.error("Invalid role for user:", role);
          return res.json({ error: "Invalid User" });
        }
  
        const [insertData] = await db.promise().query(insertDB, [adminEmail, 'xxxxxxxxxx', adminID, adminName, 'admin']);
  
        if (insertData.affectedRows === 0) {
          console.error("Insertion failed for admin:", { adminEmail, adminID, adminName });
          return res.json({ error: "Cannot Insert" });
        }
  
        console.log("Admin successfully added:", { adminEmail, adminID, adminName });
        return res.json({ valid: true });
  
      } catch (error) {
        console.error("Database error:", error);
        return res.json({ error: "Database Error" });
      }
    });
  }
  
  const updateProfile = async(req,res)=>{
       const {fullname, email} = req.body
     
       const ref = req.cookies.rfs
       if(!ref) return res.json({error:"Invalid Token"})

        jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async(err, user)=>{
          if(err) return res.json({error:"Invalid ID"})

            try {
              const [isUser] = await db.promise().query(`SELECT * FROM users where stud_id = ?`, [user.studID])
              if(!isUser) return res.json({error:"No user found"})

              const [updateProfile] = await db.promise().query(`UPDATE users SET fullname = ?, email = ? where stud_id = ?`,[fullname, email,user.studID])
              if(!updateProfile) return res.json({error:"Error while updating"})

                return res.json({valid:true})
            } catch (error) {
              return res.sendStatus(500)
            }
        })
  }

  const getAdmin = async (req, res) => {
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const findUser = "SELECT * FROM users WHERE id = ?";
    const { id } = req.body;
  
    const ref = req.cookies.rfs;
    if (!ref) return res.json({ error: "Invalid Token" });
  
    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) return res.json({ error: 'Invalid ID' });
  
      try {
        const [isUser] = await db.promise().query(findID, [user.studID]);
        if (!isUser.length) return res.json({ error: "Invalid ID" });
  
        const [getUser] = await db.promise().query(findUser, [id]);
        if (!getUser.length) return res.json({ error: "No user found" });
  
        return res.status(200).json({ valid: true, value: getUser[0] });
  
      } catch (error) {
        
        return res.sendStatus(500);
      }
    });
  };
   
  const updateAdmin = async(req,res)=>{
    const {adminName, adminID, adminEmail, id} = req.body
   const updateAdmin = "UPDATE users SET email=?, stud_id=?, fullname=? where id = ?"
    const ref = req.cookies.rfs;
    const findID = "SELECT * FROM users WHERE stud_id = ?";

    if (!ref) return res.json({ error: "Invalid Token" });
    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) return res.json({ error: 'Invalid ID' });
  
      try {
        const [isUser] = await db.promise().query(findID, [user.studID]);
        if (!isUser.length) return res.json({ error: "Invalid ID" });
       
        const [isUpdated] = await db.promise().query(updateAdmin,[adminEmail, adminID, adminName, id])
        if(!isUpdated) return res.json({error:"Can't update"})
  
          return res.json({valid:true})
      } catch (error) {
        
        return res.sendStatus(500);
      }
    });
  }
    
  const deleteAdmin = async(req,res)=>{
    const {id} = req.body
   const deleteAd = "DELETE FROM users where id = ?"
    const ref = req.cookies.rfs;
    const findID = "SELECT * FROM users WHERE stud_id = ?";

    if (!ref) return res.json({ error: "Invalid Token" });
    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) return res.json({ error: 'Invalid ID' });
  
      try {
        const [isUser] = await db.promise().query(findID, [user.studID]);
        if (!isUser.length) return res.json({ error: "Invalid ID" });
       
        const [isUpdated] = await db.promise().query(deleteAd,[ id])
        if(!isUpdated.affectedRows) return res.json({error:"Can't Delete"})
  
          return res.json({valid:true})
      } catch (error) {
        
        return res.sendStatus(500);
      }
    });
  }


const logout = async(req, res)=>{
    res.clearCookie('acs', { path: '/' });
    res.clearCookie('rfs', { path: '/' });
    return res.json({ valid: true });
}


module.exports = {getProfile, 
  logout,
   allUser, 
  addAdmin, 
  updateProfile, 
  getAdmin,
 updateAdmin,
 deleteAdmin
}