//importar modulos
const express = require('express');
//creamos la instancia de la app express
const app = express();
const port = 8888;

//middelware para procesar los datos JSON en la peticiones
app.use(express.json());

//db en memoria
let libros =[];

//ruta GET
app.get('/libros',(req,res)=>{
    res.json(libros);
});
// ruta GET: para obtener por id
app.get('/libros/:id',(req,res)=>{
    const idlibro = parseInt(req.params.id);
    const libro = libros.find(l => l.id === idlibro);

    if(libro){
        res.json(libro);
    }else{
        res.status(404).json({mensaje:'libro no encontrado en la biblioteca'})
    }
});

//ruta Post
app.post('/libros',(req,res)=>{
    const nuevoLibro = req.body;

    if(!nuevoLibro.id || !nuevoLibro.titulo || !nuevoLibro.autor){
        return res.status(400).json({mensaje:'el libro debe tner id, titulo y autor'});
    }
    libros.push(nuevoLibro);
    res.status(201).json({mensaje:'libro añadido correctamente', libro: nuevoLibro});
});

//ruta PUT
app.put('/libro/:id',(res,req)=>{
    const idlibro = parseInt(req.params.id);
    const indice = libros.findIndex(l => l.id === idlibro);

    if(indice !== -1){
        libros[indice]=req.body;
        res.json({mensaje: 'libro actualizado correctamente',libro: libros[indice]});
    }else{
        res.status(404).json({mensaje:'libro no encontrado'});
    }
});

// ruta delete
app.delete('/libros/:id',(req,res)=>{
    const idlibro = parseInt(req.params.id);
    const indice = libros.findIndex(l => l.id === idlibro);

    if(indice !== -1){
        libros.splice(indice,1);
        res.json({mensaje:'libro eliminado correctamente'});
    }else{
        res.status(404).json({mensaje:'libro no encontrado'});
    }
})
app.listen(port,()=>{
    console.log(`servidor ejecutandose en la direccion: http://localhost:${port}`);
})