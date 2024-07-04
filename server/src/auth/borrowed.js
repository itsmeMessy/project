const jwt = require('jsonwebtoken')
const {db} = require('../database/database')
const {addDays} = require('date-fns')

const brrbooks = async(req,res)=>{
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const query = `
            SELECT  u.id as user_id,
            b.id as books_id,
            b.book as book,
            b.category as category,
            b.photo as photo,
            br.purpose as purpose,
            br.accepted_data as accepted,
            br.return_date as return_date,
            br.isSub as renew,
            br.borrow_id as borrow_id
            FROM borrow br 
            JOIN users u on br.id = u.id
            JOIN books b ON br.books_id = b.books_id
            WHERE br.owner_id = ? and status = "Accepted";
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
                photo.photo = photo.photo.toString('base64');
             })
           
            return res.json({ valid: true, value:result });
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}

const rnwbooks = async(req,res)=>{
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const query = `
    SELECT u.id as user_id,
            b.id as books_id,
            b.book as book,
            b.category as category,
            b.photo as photo,
            br.purpose as purpose,
            br.accepted_data as accepted,
            br.return_date as return_date,
            br.renew as renew,
            br.borrow_id as borrow_id
            FROM borrow br 
            JOIN users u on br.id = u.id
            JOIN books b ON br.books_id = b.books_id
            WHERE br.owner_id  =  ? and status = "Accepted" and isSub =1 ;
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
                photo.photo = photo.photo.toString('base64');
             })
           
            return res.json({ valid: true, value:result });
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}
const accepetRenew = async (req, res) => {
    const { borrow_id } = req.body;
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const findBorrow = "SELECT * FROM borrow WHERE borrow_id = ?";
    const update = "UPDATE borrow SET renew = 1, return_date = ? WHERE borrow_id = ?";

    const ref = req.cookies.rfs;
    if (!ref) return res.json({ error: "Invalid Token" });

    try {
        jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.json({ error: "Invalid Token" });

            const [isUser] = await db.promise().query(findID, [user.studID]);
            if (isUser.length === 0) return res.json({ error: "No User found" });

            const [isBorrow] = await db.promise().query(findBorrow, [borrow_id]);
            if (isBorrow.length === 0) return res.json({ error: "No Borrow record found" });

            const rdate = isBorrow[0].return_date;
            const newrdate = addDays(new Date(rdate), 7);

            const [isUpdate] = await db.promise().query(update, [newrdate, borrow_id]);
            if (isUpdate.affectedRows === 0) return res.json({ error: "Error updating your date" });

            return res.json({ valid: true });
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}

const returnBooks = async(req,res)=>{
    const { borrow_id } = req.body;
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const findBorrow = "SELECT * FROM borrow WHERE borrow_id = ?";
    const update = "UPDATE borrow SET ret = 'return' where borrow_id = ?"
   

    const ref = req.cookies.rfs;
    if (!ref) return res.json({ error: "Invalid Token" });

    try {
        jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.json({ error: "Invalid Token" });

            const [isUser] = await db.promise().query(findID, [user.studID]);
            if (isUser.length === 0) return res.json({ error: "No User found" });

            const [isBorrow] = await db.promise().query(findBorrow, [borrow_id]);
            if (isBorrow.length === 0) return res.json({ error: "No Borrow record found" });

            const [isReturn] = await db.promise().query(update,[borrow_id])
            if(!isReturn) return res.json({error:"Can't update"})

            return res.json({ valid: true });
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}
const viewReturn = async(req,res)=>{
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const findBorrow = ` SELECT u.id as user_id,
            b.id as books_id,
            b.book as book,
            b.category as category,
            b.photo as photo,
            br.purpose as purpose,
            br.accepted_data as accepted,
            br.return_date as return_date,
            br.renew as renew,
            br.borrow_id as borrow_id
            FROM borrow br 
            JOIN users u on br.id = u.id
            JOIN books b ON br.books_id = b.books_id
            WHERE ret = 'return'`;
  
    const ref = req.cookies.rfs;
    if (!ref) return res.json({ error: "Invalid Token" });

    try {
        jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.json({ error: "Invalid Token" });

            const [isUser] = await db.promise().query(findID, [user.studID]);
            if (isUser.length === 0) return res.json({ error: "No User found" });

            const [isBorrow] = await db.promise().query(findBorrow);
            if (isBorrow.length === 0) return res.json({ error: "No Borrow record found" });

           console.log(isBorrow)
           isBorrow.forEach(photo=>{
            photo.photo = photo.photo.toString('base64')
           })
            return res.json({ valid: true, value:isBorrow});
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}

const acceptReturn = async(req,res)=>{
    const { borrow_id } = req.body;
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const findBorrow = "SELECT * FROM borrow WHERE borrow_id = ?";
    const findBooks = "SELECT * FROM books WHERE books_id = ?"
    const updateBooks = "UPDATE books SET available = 1 WHERE books_id = ? "
    const update = "DELETE FROM borrow where borrow_id = ?"
   

    const ref = req.cookies.rfs;
    if (!ref) return res.json({ error: "Invalid Token" });

    try {
        jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.json({ error: "Invalid Token" });

            const [isUser] = await db.promise().query(findID, [user.studID]);
            if (isUser.length === 0) return res.json({ error: "No User found" });

            const [isBorrow] = await db.promise().query(findBorrow, [borrow_id]);
            if (isBorrow.length === 0) return res.json({ error: "No Borrow record found" });

            const [isBooks] = await db.promise().query(findBooks,[isBorrow[0].books_id])
            if(!isBorrow) return res.json({error:"NO data"})

            const [isUpdateBooks] = await db.promise().query(updateBooks, isBooks[0].books_id)
            if(!isUpdateBooks) return res.json({error:"NO data"})

            const [isUpate] = await db.promise().query(update,[borrow_id])
            if(!isUpate) return res.json({error:"Can't delete"})

            return res.json({ valid: true });
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}

module.exports = {brrbooks, rnwbooks, accepetRenew, returnBooks, acceptReturn, viewReturn}