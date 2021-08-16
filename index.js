const express = require('express')
const PORT = process.env.PORT || 5000
app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(resolve(process.cwd(), 'public')))
    app.get('*', (req, res) => {
        res.sendFile(resolve(process.cwd(), 'public/index.html'))
    })
}
app.listen(PORT);