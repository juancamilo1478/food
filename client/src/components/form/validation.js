const regImage = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
const regTitle = /^\S.{0,30}\S$/;


const validation = (contenido)=>{

    const errors = {};

    if (!regTitle.test(contenido.name)) {
        errors.name= 'empty title or long'; 
    }
  
    if (!regImage.test(contenido.image)) {
        errors.image= 'not an image link';
    }
    if (isNaN(contenido.level)) {
        errors.level= 'not is a number';
    }
    if(contenido.level>100||contenido.level<0)
    {
        errors.level="points not valide "
    }
    if(contenido.diet.length===0)
    {
        errors.diet="not diet"
    }
    if(contenido.pasos.length===0){
        errors.pasos="not step"
    }
    

    return errors;
}

export default validation;