const jsonfile = require("jsonfile");
const archivo = __dirname + "/baseDatos/data.json";                             //__dirname es la ruta donde se encuentra este archivo
const baseDatos = {};

function filtros()
{
    const opcionesFiltro = 
    {
        "ciudades" : ["New York", "Orlando","Los Angeles", "Houston","Washington", "Miami"],
        "tipo" : ["Casa","Casa de Campo","Apartamento"]
    } 
    return opcionesFiltro;
}

function leeJson()
{
    return (jsonfile.readFileSync(archivo));                            //Este codigo es gracias al npm jsonfile
}

function aplicaFiltros(_filtroCiudad,_filtroTipo,_precioMinimo,_precioMaximo)
{
    // console.log(i, todoDatos[i]);
    const todoDatos = leeJson();
    let filtradoCiudades = [];
    let filtradoTipo = [];
    let resultadoBusqueda = [];

    //----------------------    Filtro 1: Por Ciudades aplicado:
    if(_filtroCiudad != "null")
    {
        //console.log(typeof(_filtroCiudad), "si tiene contenido Ciudad: ", _filtroCiudad);
        for(var i in todoDatos)
        { 
            // console.log(todoDatos[i].Ciudad);
            if(todoDatos[i].Ciudad.indexOf(_filtroCiudad) >= 0)                     //indexOf es el metodo para buscar si contiene una palabra en la cadena. Lo utilizare para la ciudad. Este devuelve -1 sino lo encuenta, y si encuentra la palabra especificada devuelve un valor positivo (de 0 a n) dependiendo la posición de la palabra en la cadena
            {
                filtradoCiudades.push(todoDatos[i]);
            }
        }
        //console.log(filtradoCiudades);                                            //Muestra si el resultado esta bien
    }
    else
    {
        filtradoCiudades = todoDatos;                                                   
        //console.log(typeof(_filtroCiudad), "esta vacio ciudad: " + _filtroCiudad);  
        //console.log(filtradoCiudades);
    }

    //-----------------------       Filtro 2: Por tipo aplicado
    if(_filtroTipo != "null")
    {
        //console.log(typeof(_filtroTipo), "si tiene contenido Tipo: ", _filtroTipo);

        for(var i in filtradoCiudades)
        {
            // console.log(i, todoDatos[i]);
            // console.log(todoDatos[i].Direccion);

            if(filtradoCiudades[i].Tipo == _filtroTipo)             // como en las opciones existe casa y casa de campo, no puedo utilizar indexof
            {
                filtradoTipo.push(filtradoCiudades[i]);
            }
        }
        //console.log(filtradoTipo);
    }
    else
    {
        //console.log(typeof(_filtroTipo), "esta vacio Tipo: " + _filtroTipo);
        filtradoTipo = filtradoCiudades;
        //console.log(filtradoTipo);
    }

    //-----------------------   Filtro 3:  Por rango de precios definido:
    for(var i in filtradoTipo)
    {
        precio = filtradoTipo[i].Precio;
        _precio = parseInt(precio.replace(/[$,*.&?^]/gi,""))                                     //Como el precio viene con caracteres especiales desde el JSON, aplico el método replace para cambiarlos por vacío. Como son varios hay que colocarlos en llaves[] y colocar un / antes y al final y gi quiere decir que sea global(En toda la cadena que se le de lo reemplace) y i (insensitive) a mayusculas y minusculas. Puse mas caracteres especiales para acordarme como se pueden poner varios

        if(_precio >= _precioMinimo && _precio <= _precioMaximo)
        {
            resultadoBusqueda.push(filtradoTipo[i]);
        }
    }    
    return resultadoBusqueda;    
}



//---------- Exporta utilizando un objeto
baseDatos.leeJson = leeJson;                                         //Carga el objeto con las propiedades o funciones creadas
baseDatos.filtros = filtros;
baseDatos.aplicaFiltros = aplicaFiltros;
module.exports = baseDatos;                                          //Finalmente exporta el objeto con las funciones creadas y cargadas