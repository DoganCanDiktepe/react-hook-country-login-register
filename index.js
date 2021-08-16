const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(PORT);