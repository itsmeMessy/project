const express = require('express');
const multer = require('multer');
const pdfParser = require('pdf-parse');
const { db } = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { viewBooks, viewAllBooks, viewBooksById, deleteBooks, getId } = require('../auth/auth.controller');
const { getProfile, logout, allUser, addAdmin, updateProfile, getAdmin, updateAdmin, deleteAdmin,  } = require('../auth/user.controller');
const { requestPasswordReset, resetPassword, requestResetPass } = require('../auth/reset');
const { borrowBook, getMyBooks, borrowCancel, borrowedBooks, getPending, acceptBook, getUserBooks, renewBooks } = require('../auth/book');
const { brrbooks, rnwbooks, accepetRenew, returnBooks, acceptReturn, viewReturn } = require('../auth/borrowed');
require('dotenv').config()

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(express.json()); 

let refreshTokens = []

router.post('/addbooks', upload.single('file'), async (req, res) => {
    const findID = "SELECT * FROM users WHERE stud_id = ?"
    const ref = req.cookies.rfs
    if(!ref) return res.json({error:"Invalid Token!"})

    try {
      const { book, category } = req.body;
      const file = req.file;
  
      if (!book || !category || !file) {
        return res.status(400).json({ error: "Please fill up all fields and upload an image file" });
      }
  
    
      const photo = file.buffer; 

      jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async(err, user)=>{
        if(err) return res.json({error:"Invalid Token"})
       
       const [studentID] = await db.promise().query(findID, [user.studID])
        if(!studentID) return res.json({error:"Invalid ID"})

            const insertQuery = 'INSERT INTO books (id, book, category, photo) VALUES (?, ?, ?, ?)';
            const id = studentID[0].id 
        db.query(insertQuery, [id, book, category, photo], (err, result) => {
          if (err) {
            console.error('Error inserting book into database:', err);
            return res.status(500).json({ error: 'Failed to add book' });
          }
    
          console.log('Book added successfully to database');
          res.status(200).json({valid:true});
        });
      })

  
    } catch (error) {
      console.error('Error handling file upload:', error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  });

  router.patch('/update_books', upload.single('photo'), async(req,res)=>{
    const { id, book, category } = req.body;
    const photo = req.file
    const findStudentIdQuery = "SELECT * FROM users WHERE stud_id = ?";
    const updateBooksQuery = "UPDATE books SET book = ?, category = ?, photo = ? WHERE books_id = ?";
    const ref = req.cookies.rfs;

    if (!ref) return res.json({ error: "Invalid Token" });

    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.json({ error: "Token not match!" });

        try {
            const [isUser] = await db.promise().query(findStudentIdQuery, [user.studID]);
            if (!isUser.length) return res.json({ error: "Invalid Id" });

            const [isUpdate] = await db.promise().query(updateBooksQuery, [book, category, photo, id]);
            if (isUpdate.affectedRows === 0) return res.json({ error: "Error updating" });

            return res.json({ success: "Book updated successfully" });
        } catch (error) {
            console.log(error);
            return res.json({ error: "An error occurred" });
        }
    });
  })

router.post('/create_account', upload.single('file'), async (req, res) => {
    const { email, password, fullname } = req.body;
    const findStudId = "SELECT * FROM users WHERE stud_id = ? or email = ?";
    const insertDB = "INSERT INTO users(email, user_password, stud_id, fullname) VALUES(?, ?, ?, ?)"
    
    if(!password.match(/^(?=.*[A-Z])|(?=.*\d)(?=.*\W).{8,}$/)) return res.json({error:"Password must contain sybmols capital and number"})
    if (!email) return res.json({ error: "Invalid Email" });
    if(!email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)) return res.json({error:"Invalid Email"})
    if (!password) return res.json({ error: "Password fields are required" });
    if (!req.file || !req.file.mimetype.includes('pdf')) return res.json({ error: "Invalid File" });

    try {
        const data = await pdfParser(req.file.buffer);
        const text = data.text;
        const stud_regex = /\d{4}-\d{5}-[A-Z]+-\d/g;
        const matchRegex = text.match(stud_regex);
        const studentID = matchRegex ? matchRegex[0] : null;


        if (!studentID) return res.json({ error: "Student ID not found in PDF" });

        if (data.info.PDFFormatVersion !== '1.3') return res.json({ error: "Invalid PDF Format" });
        if (data.info.Producer !== 'dompdf + CPDF') return res.json({ error: "Invalid PDF Format" });
        if (data.info.Title !== 'Certificate of Registration') return res.json({ error: "Invalid PDF Format" });

        const [findID] = await db.promise().query(findStudId, [studentID, email]);
        if (findID.length> 0) return res.json({error: "Already Created Account!" });

        const hashPassword = await bcrypt.hash(password, 10);
        const user_password = hashPassword
        const stud_id = studentID

        const [insert_res] = await db.promise().query(insertDB, [email, user_password, stud_id, fullname])

         return res.status(200).json({valid:true})

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing your request" });
    }
});

router.post('/login', upload.single('file'), async(req,res)=>{
    const findID = "SELECT * FROM users WHERE stud_id = ?"
    const {password} = req.body
     if(!req.file) return res.json({error:"No pdf file selected"})
    if(!password) return res.json({error:"Fill up password"})
    
    try{
        const data = await pdfParser(req.file.buffer)
        const text = data.text;

        const stud_regex = /\d{4}-\d{5}-[A-Z]+-\d/

        const stud_match = text.match(stud_regex)

        const studentID = stud_match ? stud_match[0] : null;

        if(!studentID) return res.json({error:"Invalid Student ID"})
        if (data.info.PDFFormatVersion !== '1.3') return res.json({ error: "Invalid PDF Format" });
        if (data.info.Producer !== 'dompdf + CPDF') return res.json({ error: "Invalid PDF Format" });
        if (data.info.Title !== 'Certificate of Registration') return res.json({ error: "Invalid PDF Format" });

        const [isID] = await db.promise().query(findID, [studentID])
        if(isID.length===0) return res.json({error:"No Record Found!"})
      
        const userPassword = isID[0].user_password
        const userRole = isID[0].role
        const isMatch = await bcrypt.compare(password, userPassword)
         if(!isMatch) return res.json({error:"Password did not match!"})
     
         const accessToken = generateAccessToken(isID[0].stud_id)
         const refreshToken = generateRefreshToken(isID[0].stud_id)

         res.cookie('acs', accessToken, {httpOnly:true, secure:true, sameSite:'Strict'})
         res.cookie('rfs', refreshToken, {httpOnly:true, secure:true, sameSite:'Strict'})
        refreshTokens.push(refreshToken)
        return res.json({valid:true, rrrr:userRole})
         
        
    }catch(error){
        console.log(error.message)
    }
})

function generateAccessToken(stud_id){
    const accessToken = jwt.sign({studID:stud_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1d'})
    return accessToken;
}
function generateRefreshToken(stud_id){
    const refreshtoken = jwt.sign({studID:stud_id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'1d'})
    refreshTokens.push(refreshTokens);
    return refreshtoken;
}

const isTokenValid = (req, res, next) => {
  const findRole = "SELECT * FROM users WHERE stud_id = ?";
  const token = req.cookies.acs;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        const refreshToken = req.cookies.rfs;
        if (!refreshToken || !refreshTokens.includes(refreshToken)) {
          return res.sendStatus(403);
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
          if (err) return res.sendStatus(403);
          const [isUser] = await db.promise().query(findRole, [user.studID]);

          if (!isUser.length) return res.sendStatus(404); 

          const role = isUser[0].role;

          const newAccessToken = generateAccessToken(user.studID);
          res.cookie('acs', newAccessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
          req.user = user;
          req.user.role = role; 
          next();
        });
      } else {
        return res.sendStatus(403);
      }
    } else {
      db.promise().query(findRole, [user.studID])
        .then(([isUser]) => {
          if (!isUser.length) return res.sendStatus(404); 

          const role = isUser[0].role;
          req.user = user;
          req.user.role = role; 
         next();
        })
        .catch(err => res.sendStatus(500)); 
    }
  });
};

const protectedRoute = (req, res) => {
  return res.json({ valid: true, role: req.user.role });
};

router.get('/viewBooks', viewBooks)

router.get('/protectedRoute', isTokenValid, protectedRoute)
router.get('/view_all_books', viewAllBooks)
router.post('/view_books_id', viewBooksById)
router.put('/delete_books', deleteBooks)
router.get('/user', getId)

router.post('/upload_avatar',upload.single('file'),async(req, res)=>{
    const ref = req.cookies.rfs
    const file = req.file
    const profile = file.buffer

    const findID = "SELECT * FROM users where stud_id = ?"
    const addProfile = "UPDATE users SET profile = ? where stud_id = ?"

    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET,async(err, user)=>{
        if(err) return res.json({error:"Invalid Token"})

        const [isUser] = await db.promise().query(findID, [user.studID])
        if(!isUser) return res.json({error:"Invalid Student ID"})
        
        const [insertUpdate] = await db.promise().query(addProfile, [profile, user.studID])
        if(!insertUpdate) return res.json({error:"Invalid Update"})

        return res.json({valid:true})
        
        
    })
})
router.get('/getProfile', getProfile)
router.post('/logout', logout)
router.get('/all_user', allUser)
router.post('/addadmin', addAdmin)
router.post('/borrow_books', borrowBook)
router.post('/req_reset', requestResetPass)
router.post('/reset_password', resetPassword)
router.get('/mybooks', getMyBooks)
router.post('/cancel_borrow', borrowCancel)
router.get('/borrowed_books', borrowedBooks)
router.post('/update_profile', updateProfile)
router.post('/get_admin', getAdmin)
router.post('/update_admin', updateAdmin)
router.delete('/delete_admin', deleteAdmin)
router.get('/pending', getPending)
router.post('/accept', acceptBook)
router.get('/userBook', getUserBooks)
router.post('/renew', renewBooks)


router.get('/borrow',brrbooks)
router.get('/renewBooks', rnwbooks)
router.post('/acceptRenew', accepetRenew)
router.post('/returnBooks', returnBooks)
router.post('/acceptReturn', acceptReturn)
router.get('/viewReturn', viewReturn)
module.exports = router;
