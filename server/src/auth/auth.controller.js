const jwt = require('jsonwebtoken')
const {db} = require('../database/database')
require('dotenv').config()


const getId = async(req, res)=>{
  const ref = req.cookies.rfs
  const findName = "SELECT * FROM users where stud_id = ?"

  if(!ref) return res.json({error:"Invalid Token"})

    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET,async(err,user)=>{
      if(err) return res.json({error:"Invalid ID"})
      
        const id = [user.studID]
        const [isName]= await db.promise().query(findName, [id])
        if(!isName) return res.json({error:"Invalid student Id"})
         const name = isName[0].fullname
        console.log(name)
        return res.json({valid:true, id, name})
    })
}


const viewBooks = async (req, res) => {
    const findID = "SELECT * FROM users WHERE stud_id = ?";
    const findBookPost = "SELECT * FROM books WHERE id = ?";
    const ref = req.cookies.rfs;

    if (!ref) return res.json({ error: "Invalid Token" });

    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) return res.json(err.message);

        const [isValidID] = await db.promise().query(findID, [user.studID]);
        if (!isValidID.length) return res.json({ error: "Invalid ID" });

        const id = isValidID[0].id;
        const [book_post] = await db.promise().query(findBookPost, [id]);

        if (!book_post.length) return res.json({ error: "No ID matches" });

        
        book_post.forEach(book => {
            if (book.photo) {
                book.photo = book.photo.toString('base64');
            }
        });

        return res.json({ data_value: book_post, valid: true });
    });
};

const viewAllBooks = async(req,res)=>{
    const findID = "SELECT * FROM users where stud_id = ?"
    const view_book = "SELECT * FROM books"
   
    const ref = req.cookies.rfs
    if(!ref) return res.json({error:"Invalid Token"})

    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async(err, user)=>{
        if(err) return res.json({error:"Invalid Token"})

            const [isUser] = await db.promise().query(findID, [user.studID])
            if(!isUser) return res.json({error:"Logged in first"})
            
                const [getBooks] =await db.promise().query(view_book)
                if(!getBooks) return res.json({error:"Error getting data"})
           
               getBooks.forEach(book=>{
                   if(book.photo){
                       book.photo = book.photo.toString('base64')
                   }
               })
           
               return res.json({data_value:getBooks, valid:true})
    })
}

const viewBooksById = async (req, res) => {
    const { id } = req.body;
  
    const findStudIdQuery = "SELECT * FROM users WHERE stud_id = ?";
    const findBookByIdQuery = "SELECT * FROM books WHERE books_id = ?";
  
    const ref = req.cookies.rfs;
    if (!ref) return res.json({ error: "Invalid Token" });
  
    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) return res.json({ error: "Invalid Token" });
  
      try {
        const [isValidId] = await db.promise().query(findStudIdQuery, [user.studID]);
        if (isValidId.length === 0) return res.json({ error: "Logged in First" });
  
        const [isValidBooksId] = await db.promise().query(findBookByIdQuery, [id]);
        if (isValidBooksId.length === 0) return res.json({ error: "Id not match" });
  
        const book = isValidBooksId[0];
        if (book.photo) {
          book.photo = book.photo.toString('base64');
     
        }
  
  
        return res.json({ valid: true, book});
      } catch (error) {
        return res.json({ error: "Database query failed" });
      }
    });
  };
const deleteBooks = async(req,res)=>{
  const findID = "SELECT * FROM users where stud_id = ?"
  const deleteBooks = "DELETE FROM books where books_id = ?"
  const {id} = req.body

  const ref = req.cookies.rfs
  if(!ref) return res.json({error:"Invalid Token"})

    jwt.verify(ref, process.env.REFRESH_TOKEN_SECRET, async(err, user)=>{
      if(err) return res.json({error:"Token not match!"})
      
        try{
          const [isValid_id] = await db.promise().query(findID,[user.userID])
          if(!isValid_id) return res.json({error:"Invalid ID"})
          
          const [isDeleted] = await db.promise().query(deleteBooks, [id])
          if(!isDeleted) return res.json({error:"Error while deleting your data"})

          return res.json({valid:true})
        }catch(error){
          console.log(error)
        }


        
    })
}


module.exports = {viewBooks, viewAllBooks, viewBooksById, deleteBooks,getId}