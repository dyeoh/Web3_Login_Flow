const express = require('express');
const db = require ('./db.ts');

const port = 3000;

const app = express();


app.get('/',async (req,res) => {
  res.send('Hi!')
})

app.listen(port, () => {
  console.log(`Server running at on ${port}`);
});