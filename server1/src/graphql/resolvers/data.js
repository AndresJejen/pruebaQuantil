//Modelo de documentos
const fetch = require("node-fetch");

module.exports = {
    //Resolver query docs
    demandassemana: async ()=>{                                                   
        try{

            const Existingweek = await fetch('http://localhost:8001/api/week')
            .then((u) => u.json())
            .then((json) => {
                resp = json.week
                return resp
            });

            return Existingweek.map(doc => {
                return { 
                    fecha: doc.fecha,
                    demanda: doc.demanda,
                    ...doc.doc, 
                    _id: doc.id, 
                }
            });     

        }
        catch(err) {
            console.error(`Error en consultar todos los documentos ${err}`)
            throw err;
        };
    },
    // Resolver create a new Doc 
    demandaprediccion: async (args,req) =>{    
        try{
            const DataPredict = await fetch('http://localhost:8001/api/dataforpweek')
            .then((u) => u.json())
            .then((json) => {
                resp = json.week
                return resp
            });

            //console.log(DataPredict)

            const prediccion = await fetch('http://localhost:5000/predict',
                {
                    method:'post',
                    body:JSON.stringify(DataPredict),
                    headers: { 'Content-Type': 'application/json' },
                    mode: "cors"
                }).then((u) => u.json())
                .then((json) => json.predictions)
                .then((resp => {
                    const data = JSON.parse(resp)
                    return data.map(doc => {
                        return { 
                            fecha: doc.fecha,
                            demanda: doc.demanda,
                            ...doc.doc, 
                            _id: doc.id, 
                        }
                    })
                }))

            return prediccion

            //console.log(data)


        }
        catch(err) {
            console.error(`Error en consultar todos los documentos ${err}`)
            throw err;
        };
    },
    nuevodia: async (args,req) =>{    
        try{
            const DataPredict = await fetch('http://localhost:8001/api/week')
            .then((u) => u.json())
            .then((json) => {
                resp = json.week
                return resp
            });

            const prediccion = await fetch('http://localhost:5000/predict',
                {
                    method:'post',
                    body:JSON.stringify(DataPredict),
                    headers: { 'Content-Type': 'application/json' },
                    mode: "cors"
                }).then((u) => u.json())
                .then((json) => json.predictions)
                .then((resp => {
                    return JSON.parse(resp)
                }))

                const nuevo_dato = await fetch('http://localhost:8001/api/newday',
                {
                    method:'post',
                    body:JSON.stringify(prediccion[0]),
                    headers: { 'Content-Type': 'application/json' },
                    mode: "cors"
                })    

                const data = await nuevo_dato.json()

                const respu = [data.dataStored];

                console.log(respu)

                return respu.map(doc => {
                    return { 
                        fecha: doc.fecha,
                        demanda: doc.demanda,
                        ...doc.doc, 
                        _id: doc.id, 
                    }
                });    
                


        }
        catch(err) {
            console.error(`Error en consultar todos los documentos ${err}`)
            throw err;
        };
    },
    demandahoy: async () =>{    
        try{
            
            const Lastday = await fetch('http://localhost:8001/api/lastday')
            .then((u) => u.json())
            .then((json) => {
                resp = json.week
                console.log(resp)
                return resp
            });

            return Lastday.map(doc => {
                return { 
                    fecha: doc.fecha,
                    demanda: doc.demanda,
                    ...doc.doc, 
                    _id: doc.id, 
                }
            });     

        }
        catch(err) {
            console.error(`Error en consultar todos los documentos ${err}`)
            throw err;
        };
    }
};
