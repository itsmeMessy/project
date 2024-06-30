const { db } = require('../database/database')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `587 false` for all other ports
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

const requestResetPass = async (req, res) => {
  const { email } = req.body
  const findEmail = 'SELECT * FROM users WHERE email = ?'
  try {
    const [isUserValid] = await db.promise().query(findEmail, [email])
    if (isUserValid.length === 0) return res.json({ error: "No email Found" })

      const token = jwt.sign({studID:isUserValid[0].stud_id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });

       const resetLink = `http://localhost:3000/reset_password/${token}`;
       transporter.sendMail({
       to: email,
      subject: 'Password Reset',
      text: `Click on this link to reset your password: ${resetLink}`
   });

     return res.json({valid:true, mess:'Password reset link has been sent to your email'});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const resetPassword = async(req, res)=>{
  const {newPassword, token} = req.body
  const findID = "SELECT * FROM users where stud_id = ?"
  const updatePass = "UPDATE users SET user_password = ? WHERE stud_id = ?";
  if(!newPassword.match(/^(?=.*[A-Z])|(?=.*\d)(?=.*\W).{8,}$/)) return res.json({error:"Password must contain sybmols capital and number"})

  try{
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const [isUser] = await db.promise().query(findID, [decoded.studID])
    if(!isUser) return res.json({error:"No user Found"})
    
    const pass = await bcrypt.hash(newPassword.toString(), 10)
    if(!pass) return res.json({error:"Password not hash"})

    const [updatePas] = await db.promise().query(updatePass,[pass, isUser[0].stud_id])
    if(!updatePas) return res.json({error:"Password can't update"})
    
      return res.json({valid:true})


  }catch(error){
    return res.sendStatus(500)
  }

  
}

module.exports = { requestResetPass, resetPassword }
