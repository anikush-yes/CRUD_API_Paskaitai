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



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`) //paleidziamas serveris
});