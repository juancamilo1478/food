const { Router } = require('express');

const router = Router();
const axios = require("axios");
require('dotenv').config();
const {API_KEY}= process.env;
// Importar todos los routers;
// const {getcharacterRecipe}=require('../controller/characterRecipe'
const {Recipes,Diets}=require('../db')

const { Op } = require('sequelize');
// Ejemplo: const authRouter = require('./auth.js');
//importar los modelos ya definidos 
 //// dietas 
router.get('/cards',async(req,res)=>{
    try {
        const datos=await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

        
      let total=datos.data.results.map(data=>{
       return{
        id:data.id,
        name:data.title,
        level:data.healthScore,
        image:data.image,
        diets:data.diets
       }
      })
       
        res.status(200).json(total)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})




router.get('/diets',async(req,res)=>{
    try {
    const table=await Diets.findAll()
    if(table.length===0)
    {
    const namediets=await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const total=namediets.data.results.map(data=>{
        return data.diets;
    })
    let names=[];
    total.forEach(data=>{
        data.forEach(datainter=>{
            if(!names.includes(datainter))
            {
                names.push(datainter)
            }
        })
    })
    for(var i=0; i<names.length;i++)
    {
        await Diets.create({
            name:names[i]
        })
    }
    return res.status(200).json(names)
    }
    
   return res.status(200).json(table)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
router.get('/diets/:name',async(req,res)=>{
    try {
        const {name}=req.params
        const data=await Diets.findOne({
            where:{
                name:name
            }
        })
        Diets.findByPk(data.id).then(diet=>{
            diet.getRecipes().then(recipes=>{
                res.json(recipes)
            })
        })

   

    } catch (error) {
        res.status(400).json({error:error.message})
    }

})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes/:id',async(req,res)=>{
    try {
    const {id}=req.params;
    if(id.includes("-"))
       {
          const findbase=await Recipes.findAll({
            where:{
                id
            }
        })
        return res.status(200).json(findbase)
       }
       else
     {
        const recipe=await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`) 
        const datos={
            id:recipe.data.id,
            name:recipe.data.title,
            imagen:recipe.data.image,
            resumen:recipe.data.instructions,
            level:recipe.data.healthScore,
            pasos:recipe.data.analyzedInstructions[0].steps,
            diets:recipe.data.diets
        }
            return res.json(datos)

    }    
    } catch (error) {
        res.status(400).json({error:error.response})
    }
})

//recipes quiere name
router.get('/recipes',async(req,res)=>{

    try {
    let total=[]
    const {name}=req.query
    const datas=await axios(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}`) 
    const databs=await Recipes.findAll({
  where: {
    name: {
      [Op.like]: `%${name}%`
    }
}})
const filter=databs.map(data=>{
    return {
        id:data.id,
        title:data.name,
        image:data.imagen,
        imageType:"jpg"
        
    }
})
    total=[...datas.data.results,...filter]

    // res.status(200).json(datas.data.results)
        res.status(200).json(total)
    } catch (error) {
        res.status(400).json({error:error.message})
    }


})

router.post('/recipes',async(req,res)=>{
    try {
 
    const {name,imagen,resumen,level,pasos,diet}=req.body       
    const dieta =await Diets.findOne({
            where:{
                name:diet
            }
        })


    const data= await Recipes.create({
            name,
            imagen,
            resumen,
            level,
            pasos,
    })

        
        data.addDiets([dieta])

        res.status(200).json(data)
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports = router;
