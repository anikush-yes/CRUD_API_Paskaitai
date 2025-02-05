// console.log('test');


const express = require('express'); //require pasiima is modules express
const app = express();
const pool = require('./database');

//prisijungimas prie duombazes

app.use(express.json());//requestams ir responsams

//         Apsirasyti ROUTES - kelias:

// GET        /products - route 
// GET         /products/:id - route 
// POST       /products/create - route
// PUT/PATCH /products/update/:id - route 
// DELETE   /products/delete/:id - route

//req - request
//res - response
//localhost:3000/products
//{message: 'Sėkmingai pasiekiamas produktų puslapis'} status kodas 200

app.get('/products', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    try {
        res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis' })
    }
    catch (err) {
        res.status(400).json({ error: 'error' });
    }
});

app.get('/users', async (req, res) => {
    //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
    try {
        const results = await pool.query("SELECT * FROM users");
        res.status(200).json(results.rows);
    }
    catch (err) {
        res.status(400).json({ error: 'error' });
    }
});

//gauti 1 user

app.get('/users/:id', async (req, res) => {
  
    try {
        const id = req.params.id;
        const results = await pool.query(`select * from users where id=$1`,[id]);
        res.status(200).json(results.rows);
    }
    catch (err) {
        res.status(400).json({ error: 'error' });
    }
});

//naujo vartotojo kurymas POST

//  POST         /users - route sukurs users
app.post('/users', async (req, res) => {
    try {
        // insert into users (id,username,"password")  values (1000, 'idetasPerInsert','idetasPerInser')
       
        const {id, username, password} = req.body;
 
        const results = await pool.query(`insert into users (id,username,"password")  values (${id}, '${username}','${password}') returning *`);    
        // const results = await pool.query(`select * from users where id=${id}`);    
        res.status(201).json(results.rows[0]);
        // res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis'});
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
   
});


//PUT/PATCH 

app.put('/users/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;
        const result = await pool.query('UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *', [username, password, id]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(400).json({ error: 'error' });
    }
});

//Destytojo kodas:
// app.put('/users/:id', async(req, res)=> {
//     try{
//         const id = req.params.id;
//         const {username, password} = req.body;
//         const results = await pool.query(`update users set username = '${username}', "password" = '${password}' where id = ${id} returning*`);
//         res.status(201).json(results.rows[0]);
//     }
//     catch(err){
//         res.status(400).json({error: 'error'});
//     }
   
// });


//DELETE USER

app.delete('/users/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(400).json({ error: 'error' });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`) //paleidziamas serveris
});