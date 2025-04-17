const generateUniqueid=require('generate-unique-id');


const generateNUmber=()=>
{
    const id=generateUniqueid({
        length:4,
        useLetters:false,
        useNumbers:true,
        useSymbols:false,

    })

    return id;
}

module.exports={generateNUmber}