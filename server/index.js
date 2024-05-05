const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database/db');

app.use(cors());



app.get('/xboxlive/community', (req, res) =>{
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

app.get('/marketplace/games', (req, res) => {
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


app.listen(8080, () => {
      console.log('server listening on port 8080')
});

app.get('/', (req, res) => {
      res.send('Hello World!')
})
