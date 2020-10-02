// const players = require('../players');

const Player = require('../models').Player;
const Team = require('../models').Team
const Pokemon = require('../models').Pokemon;

const index = (req, res) => {
    res.render('players/index.ejs')
};

const signUp = (req,res) => {
    res.render('players/signup.ejs');
}

const infoToPage = (req,res) => {
    Player.create(req.body)
    .then(newPlayer => {
         //default is GET in redirect
        res.redirect(`/players/profile/${newPlayer.id}`)
    })
}

// OLD CODE ----------------------
// const infoToPage = (req,res) => {
//     players.push(req.body)
//     res.redirect(`/players/profile/${players.length-1}`)
// }
// ---------------------------------

const profile = (req, res) => {
    Player.findByPk(req.params.index, {
        include: [{model:Team}, {model:Pokemon}
        ]
    })
    .then(player => {
        Team.findAll()
        .then(teams => {
            Pokemon.findAll()
            .then(foundPokemon => {
            res.render('players/profile.ejs',{
                player: player,
                teams: teams,
                pokemon: foundPokemon
            }) 
        })
        })
    }).catch(err=> console.log(err))
}

// OLD CODE------------------------------
// const profile = (req, res) => {
//     res.render('players/profile.ejs',{
//         player: players[req.params.index],
//         index: [req.params.index]
//     })
// }
// ---------------------------------------

const renderlogin = (req, res) => {
    res.render('players/login.ejs', {
        // player: players[req.params.index],
        // password : players[req.params.index]
    });
}

const login = (req,res) => {
    Player.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    .then(foundPlayer => {
        res.redirect(`/players/profile/${foundPlayer.id}`);
    })
}

// OLD CODE----------------------
// const login = (req,res) => {
//     let index = players.findIndex(
//         player => (player.username === req.body.username && player.password === req.body.password)
//     )

//     res.redirect(`/players/profile/${index}`);
// }
// -------------------------------


const edit = (req, res) => {
    Player.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(updatedPlayer => {
        Pokemon.findByPk(req.body.pokemon)
        .then(foundPokemon => {
            Player.findByPk(req.params.index)
            .then(foundPlayer => {
                foundPlayer.addPokemon(foundPokemon);
                res.redirect(`/players/profile/${req.params.index}`);
            })
        })
    })
}
    

// OLD CODE---------------------------
// const edit = (req, res) => {
//     players[req.params.index] = req.body;
//     res.redirect(`/players/profile/${req.params.index}`);
// }
// ------------------------------------

const deletePlayer = (req, res) => {
    Player.destroy({
        where: {id: req.params.index}
    })
    .then(() => {
        res.redirect('/players'); 
    })  
}

// OLD CODE------------------------------
// const deletePlayer = (req,res) => {
//     players.splice(req.params.index, 1);
//     res.redirect('/players');
// }
// --------------------------------------

module.exports = {
    index,
    signUp,
    infoToPage,
    profile,
    renderlogin,
    login,
    edit,
    deletePlayer
}