const jwt = require('jsonwebtoken')
const {db} = require('../database/database')



const borrowBook = async(req,res)=>{
    const {purpose, id, owner_id} = req.body
    const findBook = "SELECT * FROM books where books_id = ?"
    const findID = "SELECT * FROM users where stud_id = ?"
    const insertBorrow = "INSERT INTO borrow(id, books_id, purpose, owner_id) VALUES (?,?,?,?)"

    const ref = req.cookies.rfs

    if(!ref) return res.json({error:"Invalid TOken"})

    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async(err, user)=>{
        if(err) return res.json({error:"Invalid Token"})
     
            try {
                const [isUser] = await db.promise().query(findID, [user.studID])
                if(!isUser) return res.json({error:"No user Found"})
                const user_id = isUser[0].id
                
                const [isfindBook] = await db.promise().query(findBook, [id])
                if(!isfindBook) return res.json({error:"No book found"})
                  
                const books_id = isfindBook[0].books_id
               
                const [insert] = await db.promise().query(insertBorrow, [user_id, books_id, purpose, owner_id])
                if(!insert) return res.json({error:"Can't insert Books"})

                return res.json({valid:true})

           
                   
            } catch (error) {
                return res.sendStatus(500);
            }
    })
}

const getMyBooks = async (req, res) => {
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const query = `
       SELECT u.id as user_id,
            b.id as books_id,
            b.book as book,
            b.category as category,
            b.photo as photo,
            br.purpose as purpose,
            br.borrow_id as borrow_id
            FROM borrow br 
            JOIN users u on br.id = u.id
            JOIN books b ON br.books_id = b.books_id
            WHERE u.id = ? and status = "Pending";
    `;
    
    const ref = req.cookies.rfs;
    if (!ref) return res.json({ error: "Invalid Token" });

    try {
        jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.json({ error: "Invalid Token" });

            const [isUser] = await db.promise().query(findID, [user.studID]);
            if (isUser.length === 0) return res.json({ error: "No User found" });

             const [result] = await db.promise().query(query,[isUser[0].id])

             result.forEach(photo=>{
                photo.photo = photo.photo.toString('base64')
             })
            return res.json({ valid: true, value:result });
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

const borrowCancel = async(req,res)=>{
    const {borrowID} = req.body
    const findID = "SELECT * FROM users where stud_id = ?"
    const id = "SELECT * FROM borrow where id = ?"
    const cancel = "DELETE from borrow where borrow_id = ?"

    const ref = req.cookies.rfs
    if(!ref) return res.json({error:"Invalid Token"})

    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET,async(err, user)=>{
        if(err) return res.json({error:"Invalid Token"})
        try {
            const [isUser] = await db.promise().query(findID,[user.studID])
            if(!isUser) return res.json({error:"No User found"})
            
                const [isInBorrow] = await db.promise().query(id, [isUser[0].id])
                if(!isInBorrow) return res.json({error:"No Id found"})
                
                const [isDelete] = await db.promise().query(cancel, [borrowID])
                if(!isDelete) return res.json({error:"Can't delete"})
                 return res.json({valid:true})
            
        } catch (error) {
            return res.sendStatus(500)
        }
    })
}
const borrowedBooks = async (req, res) => {
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const query = `
       SELECT u.id as user_id,
            b.id as books_id,
            b.book as book,
            b.category as category,
            b.photo as photo,
            br.purpose as purpose,
            br.accepted_data as accepted,
            br.borrow_id as borrow_id
            FROM borrow br 
            JOIN users u on br.id = u.id
            JOIN books b ON br.books_id = b.books_id
            WHERE u.id = ? and status = "Accepted";
    `;
    
    const ref = req.cookies.rfs;
    if (!ref) return res.json({ error: "Invalid Token" });

    try {
        jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.json({ error: "Invalid Token" });

            const [isUser] = await db.promise().query(findID, [user.studID]);
            if (isUser.length === 0) return res.json({ error: "No User found" });

             const [result] = await db.promise().query(query,[isUser[0].id])

             result.forEach(photo=>{
                photo.photo = photo.photo.toString('base64')
             })
            return res.json({ valid: true, value:result });
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

const getPending = async(req,res)=>{
    const findID = "SELECT * FROM users where stud_id = ?"
    const findBorrow = "SELECT * FROM borrow where owner_id = ?"
    const findBooks = "SELECT * FROM books where books_id = ?"
    const ref = req.cookies.rfs;
    if (!ref) return res.json({ error: "Invalid Token" });
   
    try {
        jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.json({ error: "Invalid Token" });
            

            const [isUser] = await db.promise().query(findID, [user.studID]);
            if (isUser.length === 0) return res.json({ error: "No User found" });
            console.log(isUser)
         
           const [isBorrow] = await db.promise().query(findBorrow, [isUser[0].id])
            if(!isBorrow) return res.json({error:"No data found"})

            const [isBooks] = await db.promise().query(findBooks,[isBorrow[0].books_id])
            
            const [user_id] = await db.promise().query(findID,[isBorrow[0].id])
            if(!user_id) return res.json({error:"NO user found"})
                
            return res.json({valid:true, borrow:isBorrow, book:isBooks, user:user_id})
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}

module.exports = {borrowBook, getMyBooks, borrowCancel,borrowedBooks, getPending}