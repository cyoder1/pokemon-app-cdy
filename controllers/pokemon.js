// const pokemon = require('../pokemon');

// const { pokemon } = require('.');

const Pokemon = require('../models').Pokemon;
const Player = require('../models').Player;


const index = (req, res) => {
    Pokemon.findAll({
        order: [
            ['name', 'ASC']
        ]
    })
    .then(pokemon => {
        res.render('index.ejs', {
            pokemon: pokemon
        })
    })  
}
//OLD CODE --------------------
// const index = (req,res) => {
//     res.render('index.ejs', {
//         pokemon: pokemon
//     })
// }
//-------------------------------

const newInput = (req,res) => {
    res.render('new.ejs');
}

const newPokemon = (req, res) => {
    Pokemon.create(req.body)
    .then(newFruit => {
         //default is GET in redirect
    res.redirect(`/pokemon`);
    })
}

// OLD CODE -------------------------
// const newPokemon = (req,res) => {
//     pokemon.push(req.body);

//     res.redirect(`/pokemon/${pokemon.length-1}`);
// }
//-----------------------------------

const show = (req, res) => {
    Pokemon.findByPk(req.params.index, {
        include: [Player]          
    })
    .then(pokemon => {
        res.render('show.ejs' , {
            pokemon: pokemon
        })
    })
}
//OLD CODE -------------------------
// const show = (req,res) => {
//     res.render('show.ejs', {
//         pokemon: pokemon[req.params.index], 
//         index: req.params.index
//     })
// }---------------------------------

const edit = (req, res) => {
    Pokemon.findByPk(req.params.index)
    .then(foundPokemon => {
            console.log(foundPokemon),
            res.render('edit.ejs', {
                pokemon: foundPokemon,
            })
    })
}

// OLD CODE --------
// const edit = (req,res) => {
//     res.render('edit.ejs', {
//         pokemon: pokemon[req.params.index],
//         index: req.params.index
//     })
// }---------------------------------

const updatePokemon = (req, res) => {
    Pokemon.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(updatedPokemon => {
        res.redirect(`/pokemon/${req.params.index}`);
    })   
}

//OLD CODE ----------------------------
// const updatePokemon = (req,res) => {
//     pokemon[req.params.index] = req.body;
//     res.redirect(`/pokemon/${req.params.index}`)
// }
//---------------------------------------

const deletePokemon = (req, res) => {
    Pokemon.destroy({
        where: {id: req.params.index}
    })
    .then(() => {
        res.redirect('/pokemon'); 
    }) 
}

// OLD CODE ----------------------------
// const deletePokemon = (req,res) => {
//     pokemon.splice(req.params.index, 1);
//     res.redirect('/pokemon');
// }
// ------------------------------------

module.exports = {
    index,
    newInput,
    newPokemon,
    show,
    edit,
    deletePokemon,
    updatePokemon
}