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

// app.get('/products', async (req, res) => {
//     //neapibrezta klaida 400 koda, jeigu nepavyksta prisijungti prie duombazes 500
//     try {
//         res.status(200).json({ message: 'Sėkmingai pasiekiamas produktų puslapis' })
//     }
//     catch (err) {
//         res.status(400).json({ error: 'error' });
//     }
// });

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

app.post('/users/create', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        res.status(201).json(result.rows);
    }
    catch (error) {
        res.status(400).json({ error: 'error' });
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

//---------------------------------------------------------------------------------------------------------------------------------------

//PRODUCTS CRUD:


//Get all products

app.get('/products', async (req, res) => {
    
    try {
        const results = await pool.query("SELECT * FROM products");
        res.status(200).json(results.rows);
    }
    catch (err) {
        res.status(400).json({ error: 'error' });
    }
});


//Get specific product

app.get('/products/:id', async (req, res) => {
  
    try {
        const id = req.params.id;
        const results = await pool.query(`select * from products where id=$1`,[id]);
        res.status(200).json(results.rows);
    }
    catch (err) {
        res.status(400).json({ error: 'error' });
    }
});


//Create new product

app.post('/products', async (req, res) => {
    try {
       
        const {title, description, price} = req.body;
 
        const results = await pool.query(`insert into products (title, description, price)  values ('${title}','${description}','${price}') returning *`);    
        //   
        res.status(201).json(results.rows[0]);
        
    }
    catch (err) {
        res.status(400).json({error: 'error'});
    }
   
});


// Edit product 

app.put('/products/update/:id', async (req, res) => {
    try {
        const { title, description, price } = req.body;  
        const { id } = req.params;  

        const result = await pool.query(
            'UPDATE products SET title = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
            [title, description, price, id]  
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });  
        }

        res.status(200).json(result.rows[0]);  
    }
    catch (error) {
        console.error(error);  
        res.status(400).json({ error: error.message });  
    }
});



//Delete product

app.delete('/PRODUCTS/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
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

