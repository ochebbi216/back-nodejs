const express = require ("express");
const bodyParser = require ("body-parser");
const cors = require ("cors");
const mongoose = require ("mongoose");
const passport = require ("passport");


// mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://gang_of_2:gang_2@cluster0.omlg9.mongodb.net/gestion_immobiliere"
, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', ()=>{
    console.log("connected to database ^_- " );
});

mongoose.connection.on('error', (err)=>{
    console.log("Database not connected :'( " + err);
});
const app = express();
app.use(cors());
// app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

require("./config/passport")(passport);

const Admin = require('./routes/Admin');
const Appartement = require('./routes/Appartement');
const Contrat = require('./routes/Contrat');
const Facture = require('./routes/Facture');
const Immeuble = require('./routes/Immeuble');
const Paiement = require('./routes/Paiement');
const Utilisateur = require('./routes/Utilisateur');

app.use("/admin", Admin);
app.use("/Appartement", Appartement);
app.use(`/Contrat`, Contrat);
app.use(`/Facture`, Facture);
app.use(`/Immeuble`, Immeuble);
app.use(`/Paiement`, Paiement);
app.use(`/Utilisateur`, Utilisateur);

const port=3000
app.listen(port, ()=>{
    console.log("The server started on port " + port);
});
