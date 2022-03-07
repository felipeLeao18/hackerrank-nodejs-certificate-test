var recipes = require('../recipes.json');
var router = require('express').Router();


router.get('/shopping-list', (req, res) => {

    try{

    if(!req.query || !req.query.ids){
      res.statusCode = 400
      return res.send()
      
    }
    
    const ids = req.query.ids.split(',')
    
    const validRecipes = ids.filter(id => {
      const isValid = recipes.some(recipe=> recipe.id === Number(id))
      if(!isValid){
        return
      }
      return Number(id)
      
    })

    if(!validRecipes.length){
      res.statusCode = 404
      return res.send('NOT_FOUND')
    }
    
    
    if(validRecipes.length === 1){
      const [id] = validRecipes
      
      const {ingredients} =  recipes.find(recipe => recipe.id === Number(id))
      
      
      res.statusCode = 200
      return res.send(ingredients)
      
    }

      const ingredients = validRecipes.map(id => {
        return recipes.find(recipe => recipe.id === Number(id))
      }).map(recipe => recipe.ingredients).flat()

      res.statusCode = 200
      return res.send(ingredients)
    
    }catch(err){
      res.statusCode = 500
      return res.send()
    }
    
});
module.exports = router;

