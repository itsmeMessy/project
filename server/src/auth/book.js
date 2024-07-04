const jwt = require('jsonwebtoken')
const {db} = require('../database/database')



const borrowBook = async(req,res)=>{
    const {purpose, id, owner_id} = req.body
    const findBook = "SELECT * FROM books where books_id = ?"
    const findBorrow = "SELECT * FROM borrow WHERE owner_id = ? AND books_id = ?"
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
                console.log(user_id)

                const [isBorrow] = await db.promise().query(findBorrow,[owner_id, id])
                if(isBorrow.length>0) return res.json({error:"Opps You have pending on this Books!"})
                
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
       SELECT 
	u.id AS id,
    u.stud_id AS student_id,
    u.fullname AS fullname,
    b.books_id AS book_id,
    b.book AS books_name,
    b.category AS category,
    b.photo AS photo,
    br.purpose AS purpose,
    br.borrow_id AS borrow_id,
    br.status AS status, 
    br.owner_id AS owner_id
FROM 
    borrow br 
JOIN 
    books b
ON 
    br.books_id = b.books_id
JOIN users u
ON br.id = u.id
WHERE 
    br.status = 'Pending' and  br.owner_id = ?;
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
             console.log(result)
            return res.json({ valid: true, value:result });
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

const getUserBooks = async(req,res)=>{
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const query = `
       SELECT 
	u.id AS id,
    u.stud_id AS student_id,
    u.fullname AS fullname,
    b.books_id AS book_id,
    b.book AS books_name,
    b.category AS category,
    b.photo AS photo,
    br.purpose AS purpose,
    br.borrow_id AS borrow_id,
    br.status AS status, 
    br.owner_id AS owner_id
FROM 
    borrow br 
JOIN 
    books b
ON 
    br.books_id = b.books_id
JOIN users u
ON br.id = u.id
WHERE 
    br.status = 'Pending' and  u.id = ?;
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
             console.log(result)
            return res.json({ valid: true, value:result });
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}





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
        SELECT  u.id as user_id,
            b.id as books_id,
            b.book as book,
            b.category as category,
            b.photo as photo,
            br.purpose as purpose,
            br.accepted_data as accepted,
            br.return_date as return_date,
            br.ret as retttt,
            br.isSub as renew,
            br.borrow_id as borrow_id
            FROM borrow br 
            JOIN users u on br.id = u.id
            JOIN books b ON br.books_id = b.books_id
            WHERE u.id = ? and status = "Accepted";;
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
};

const getPending = async(req,res)=>{
    const findID = "SELECT * FROM users where stud_id = ?";
    const getPend = `
SELECT 
    u.id as user_id,
    b.id as books_id,
    b.book as book,
    b.category as category,
    b.photo as photo,
    br.purpose as purpose,
    br.accepted_data as accepted,
    DATE_FORMAT(br.return_date, '%Y%m%d') as return_date,
    br.borrow_id as borrow_id
FROM 
    borrow br 
JOIN 
    users u on br.id = u.id
JOIN 
    books b ON br.books_id = b.books_id
WHERE 
    u.id = ? and status = "Accepted"; `
    
    const ref = req.cookies.rfs;
    if (!ref) return res.json({ error: "Invalid Token" });
   
    try {
        jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.json({ error: "Invalid Token" });
            

            const [isUser] = await db.promise().query(findID, [user.studID]);
            if (isUser.length === 0) return res.json({ error: "No User found" });
            
            const [isPend] = await db.promise().query(getPend,[isUser[0].id])
            if(!isPend) return res.json({error:"Student ID not match"})

            isPend.forEach(pic=>{
                pic.photo = pic.photo.toString('base64')
            })

            return res.json({valid:true, value:isPend})
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}

const acceptBook = async (req, res) => {
    const { id } = req.body;
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const update = "UPDATE books SET available = 0 WHERE books_id = ?";
    const borrow = "SELECT * FROM borrow WHERE borrow_id = ?";
    const accept = "UPDATE borrow SET status = 'Accepted' WHERE borrow_id = ?";
    const findBooks = "SELECT * FROM books WHERE books_id = ?";
    const updateAcceptedDate = "UPDATE borrow SET accepted_data = CURDATE(), return_date = DATE_ADD(CURDATE(), INTERVAL 7 DAY) WHERE borrow_id = ?"; 

    const ref = req.cookies.rfs;
    if (!ref) return res.json({ error: "Invalid Token" });

    try {
        jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.json({ error: "Invalid Token" });

            const [isBooks] = await db.promise().query(borrow, [id]);
            if (!isBooks.length) return res.json({ error: "Can't find Books" });

            const [findBook] = await db.promise().query(findBooks, [isBooks[0].books_id]);
            if (!findBook.length) return res.json({ error: "Can't find Books" });

            const [isUser] = await db.promise().query(findID, [user.studID]);
            if (isUser.length === 0) return res.json({ error: "No User found" });

            const [isAccept] = await db.promise().query(accept, [id]);
            if (!isAccept.affectedRows) return res.json({ error: "Can't accept" });

            const [isUpdate] = await db.promise().query(update, [findBook[0].books_id]);
            if (!isUpdate.affectedRows) return res.json({ error: "Can't update" });

            const [isDateUpdated] = await db.promise().query(updateAcceptedDate, [id]);
            if (!isDateUpdated.affectedRows) return res.json({ error: "Can't update accepted date" });

            return res.json({ valid: true });
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};


const renewBooks = async (req, res) => {
    const { purpose, borrow_id, user_id } = req.body;
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const findBooks = "SELECT * FROM borrow WHERE borrow_id = ? AND id = ?";
    const updateRenew = "UPDATE borrow SET renew_mess = ? AND isSub = '1'  WHERE borrow_id = ?";
    const ref = req.cookies.rfs;

    if (!ref) return res.json({ error: "Invalid Token" });

    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.json({ error: "Invalid Token" });

        try {
            const [userResult] = await db.promise().query(findID, [user.studID]);
            if (userResult.length === 0) return res.json({ error: "No user Found" });

            const [booksResult] = await db.promise().query(findBooks, [borrow_id, user_id]);
            if (booksResult.length === 0) return res.json({ error: "Error in getting your books" });

            const [updateResult] = await db.promise().query(updateRenew, [purpose, borrow_id]);
            if (updateResult.affectedRows === 0) return res.json({ error: "Error while updating your books" });

            return res.json({ valid: true });
        } catch (error) {
            console.error(error); 
            return res.sendStatus(500);
        }
    });
};



module.exports = {borrowBook, 
    getMyBooks, 
    borrowCancel, 
    borrowedBooks,
     getPending,
      acceptBook , 
      getUserBooks,
      renewBooks
    }
