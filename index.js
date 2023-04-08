const express = require('express');
const cors = require('cors');
const router = require('./router/index.js');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => { 
    res.send('nan expressJS');
});     
app.use(router);

app.listen(port, () => console.log(`App listening on port http://localhost:${port}`));