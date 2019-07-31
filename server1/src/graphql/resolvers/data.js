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
                .then((json) => {
                    resp = json
                    return resp
                });

            console.log(prediccion)

        }
        catch(err) {
            console.error(`Error en consultar todos los documentos ${err}`)
            throw err;
        };
    },
    nuevodia: async (args,req) =>{    
        
        if(!req.isAuth){
            throw new Error('User Unauthenticated!');
        }
        
    
        const doc = new Doc({
            name: args.docInput.name,
            titulo: args.docInput.titulo,
            author: args.docInput.author,
            mlanguage: args.docInput.mlanguage,
            typedoc: args.docInput.typedoc,
            wlanguage: args.docInput.wlanguage,
            ilevel: args.docInput.ilevel,
            flevel: args.docInput.flevel,
            date: new Date(),
            link: args.docInput.link,
            helper : req.userId
        });
        try{
            const result = await doc.save();
            const helper = await User.findById(req.userId);
            if (!helper){
                throw new Error('Usuario inexistente.');
            }
            helper.documentsadded.push(doc);
            
            await helper.save();

            return transformDoc(result);
        }
        catch(err) {
            console.error(`Error en guarda un nuevo documento ${err}`)
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