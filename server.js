const express = require('express');

const port = 9000;
const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);
