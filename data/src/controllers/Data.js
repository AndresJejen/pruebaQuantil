const Data = require('../models/Data');

function getday(req,res){
    const Fecha = req.body.fecha;
    console.log("Fecha a consultar",Fecha);

    Data.findOne({fecha:Fecha})
        .then((data)=>{
            if (!data) return res.status(404).send({mensaje:"La fecha No está registrada"});
            res.status(200).send({data})
        })
        .catch(err => {
            if (err) return res.status(500).send({mensaje:`Error al realizar la petición: ${err}`});
        });
}

async function getlastday(req,res){
    try{
        const week = await Data.find({}).sort({$natural:-1}).limit(1)
        console.log(week);
        
        if (!week) return res.status(404).send({mensaje:"NO existen datos"});
        return res.status(200).send({week});
    }
    catch(err){
        if (err) return res.status(500).send({mensaje:`Error al realizar la petición: ${err}`})
    }
}

async function getweek(req,res){

    try{
        const week = await Data.find({}).sort({$natural:-1}).limit(8)
        console.log(week);
        
        if (!week) return res.status(404).send({mensaje:"NO existen datos"});
        return res.status(200).send({week});
    }
    catch(err){
        if (err) return res.status(500).send({mensaje:`Error al realizar la petición: ${err}`})
    }
}

async function getdata4nextweek(req,res){
    try{
        const week = await Data.find({}).sort({$natural:-1}).limit(16)
        console.log(week);
        
        if (!week) return res.status(404).send({mensaje:"NO existen datos"});
        return res.status(200).send({week});
    }
    catch(err){
        if (err) return res.status(500).send({mensaje:`Error al realizar la petición: ${err}`})
    }
}

function savenewday(req,res){
    console.log(req.body)

    let datos = new Data();
    datos.fecha = req.body.fecha
    datos.demanda = req.body.demanda

    datos.save()
        .then((dataStored)=>{
        
        res.status(200).send({dataStored})
    })
    .catch( err => {
        if (err) res.status(500).send({mensaje:`Se ha producido un error al guardar los datos: ${err}`})
    })
}

module.exports = {
    getday,
    getlastday,
    getweek,
    savenewday,
    getdata4nextweek
}