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

function getlastday(req,res){
    Data.find({}).sort({$natural:-1}).limit(1)
    .then((day)=>{
        if (!day) return releaseEvents.status(404).send({mensaje:"NO existen datos"});
        res.status(200).send({day})
    })
    .catch(err => {
        if (err) return res.status(500).send({mensaje:`Error al realizar la petición: ${err}`})
    });
}

function getweek(req,res){
    Data.find({}).sort({$natural:-1}).limit(7)
    .then((week)=>{
        if (!week) return releaseEvents.status(404).send({mensaje:"NO existen datos"});
        res.status(200).send({week});
    })
    .catch(err => {
        if (err) return res.status(500).send({mensaje:`Error al realizar la petición: ${err}`})
    });
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
    savenewday
}