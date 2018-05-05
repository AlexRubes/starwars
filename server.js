//require needed packages
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let app = express();
let PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
 
// parse application/json
app.use(bodyParser.json());

// Data
//make sql call here and store results into array of objs
var characters = [{
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
}, {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
}, {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
}];

//routes
app.get('/', function (req, res) {
    res.send('Welcome to the Star Wars page!');
    console.log('home page traffic');
    //can take this console and fs it to a file or database
    res.sendFile(path.join(__dirname, 'index.html'));
});

//api route
app.get('/api/characters', function (req, res) {
    return res.json(characters);
});

//get 1 character at a time
app.get('/api/characters/:person', function (req, res) {
    let chosen = req.params.person; //the string yoda if user types /yoda 
    for (var i = 0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }

    return res.send('No character found.');
});

//create new characters
app.post('/api/characters/', function (req, res) {
    let newCharacter = req.body;
    //parse the body, but parseBody does that for me --- magic
    console.log(newCharacter);

    characters.push(newCharacter);
    res.json(newCharacter);
});

//listener
app.listen(PORT, function () {
    console.log("App listening on port " + PORT);
});