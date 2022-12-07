import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';

const envFound = dotenv.config();
if (!envFound) throw Error('Failed to load invironment variables');

const PORT = process.env.DB_PORT || 5100;

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
})

const app = express();
app.use(cors());
app.use(express.json());

const query = (qryStr, values) => {
    return new Promise((resolve, reject) => {
        db.query(qryStr, values, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

app.get('/people', async(req, res, next) => {
    try{res.status(200).send(await query('SELECT * FROM mock_data'))
    }catch(err){next(err)}
})

app.put('/people/update/first_name/:id', async(req, res, next) => {
    try{res.status(200).send(await query('UPDATE mock_data SET first_name = ? WHERE id = ?', [req.body.first_name, req.params.id]))
    }catch(err){next(err)}
})

app.put('/people/update/last_name/:id', async(req, res, next) => {
    try{res.status(200).send(await query('UPDATE mock_data SET last_name = ? WHERE id = ?', [req.body.last_name, req.params.id]))
    }catch(err){next(err)}
})

app.put('/people/update/email/:id', async(req, res, next) => {
    try{res.status(200).send(await query('UPDATE mock_data SET email = ? WHERE id = ?', [req.body.email, req.params.id]))
    }catch(err){next(err)}
})

app.put('/people/update/city/:id', async(req, res, next) => {
    try{res.status(200).send(await query('UPDATE mock_data SET city = ? WHERE id = ?', [req.body.city, req.params.id]))
    }catch(err){next(err)}
})

app.put('/people/update/country/:id', async(req, res, next) => {
    try{res.status(200).send(await query('UPDATE mock_data SET country = ? WHERE id = ?', [req.body.country, req.params.id]))
    }catch(err){next(err)}
})



app.delete('/delete/:id', async (req, res, next) => {
    try{res.status(200).send(await query('DELETE FROM mock_data WHERE id = ?', [req.params.id]))
    }catch(err){next(err)}
})

//Error Handling Middleware
app.use(handleError);

function handleError(err, req, res, next){
    if(err){
        console.error(err)
        res.status(500).send(`Server Error: ${err}`)
    } else next();
}

app.listen(PORT, () => {console.log(`Server listening at port ${PORT}...`)})