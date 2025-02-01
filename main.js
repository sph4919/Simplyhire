const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Redirect based on service type
app.get('/service/:type', (req, res) => {
    const serviceType = req.params.type;
    res.redirect(`https://category.html/${serviceType}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
