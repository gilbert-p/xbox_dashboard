const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');

const db = require('../database/db');


app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/xboxlive/community', (req, res) =>{
  const sql = 'SELECT * FROM xboxlive_content';

  db.query(sql, (err, results) => {
    if(err){
      console.log('Error fetching data:', err);
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);
    }
  })
});

router.get('/marketplace/games', (req, res) => {
  const sql = 'SELECT * FROM spotlight_content';

  db.query(sql, (err, results) => {
    if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
    } else {
        res.json(results);
    }
});
});


app.use("/api", router);

export const handler = serverless(app);