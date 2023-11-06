const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const corsOptions = {
    origin: "*"
}
const db = require('./models');

app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Successfully connected to MongoDB.');
}).catch(err => {
    console.error('Connection error', err);
    process.exit();
});


app.get("/", (req, res) => {
    res.json({ message: "Bienvenue dans la base de données de test" })
})

require('./routes/tweets')(app);

const PORT = process.env.PORT || 3060;

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});