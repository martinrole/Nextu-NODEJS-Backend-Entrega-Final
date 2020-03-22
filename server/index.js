//---------  Registro de dependencias    ---------
const datos = require("./datos.js");
const express = require("express");                 
const app = express();                              //Inicializa o crea el servidor
const port = 3000;
const cors = require("cors");                       //CORS sirve para proporcionar una conexión entre servidor y la petición del navegador para habilitarlos y no que la bloquee


app.post("/filtros", cors(), function(peticion, respuesta,next)
{
    //console.log("peticion url: ", peticion.url);
    respuesta.send(datos.filtros());
    next();
});

app.post("/buscarTodos", cors(), function(peticion, respuesta, next)
{
    respuesta.send(datos.leeJson());
    next();
});
app.post("/buscar", cors(), function(peticion, respuesta, next)
{
    const _filtroCiudad = peticion.query.filtroCiudad;
    const _filtroTipo = peticion.query.filtroTipo;
    const _precioMinimo = peticion.query.precioMinimo;
    const _precioMaximo = peticion.query.precioMaximo;

    resultado = datos.aplicaFiltros(_filtroCiudad,_filtroTipo,_precioMinimo,_precioMaximo);

    respuesta.status(200).send(resultado);
    next();
});

app.listen(port,function()
{
    console.log("Servidor funcionando", port);
    console.log(datos);
});

app.get("*", function(peticion, respuesta)
{
    respuesta.send("Ruta no encontrada");
});

