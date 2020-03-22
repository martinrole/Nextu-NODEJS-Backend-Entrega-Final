//Inicializa el documento:

$(document).ready(function()
{
  inicializarSlider();
  setSearch();
  cargaFiltro();
})

// -----------    PUNTO 1: Muestra todos los registros     ----------------

// $("#buscar").click(function()
// {
//   const ubicacion = "http://localhost:3000/buscarTodos";

//   $.ajax(
//   {
//     type: "post",
//     url: ubicacion,
//     data: {},
//     success: function(data)
//     {
//       // console.log(data);
//       let agregar = document.querySelector(".lista");
//       agregar.innerHTML = "";

//       for(let campo of data)
//       {
//         agregar.innerHTML += 
//         `         
//         <div class="card horizontal">
//           <div class="card-image">
//             <img src="img/home.jpg">
//           </div>
//           <div class="card-stacked">
//             <div class="card-content">
//                 <b>Direccion: </b>${campo.Direccion}<p></p>
//                 <b>Ciudad: </b>${campo.Ciudad}<p></p>             
//                 <b>Telefono: </b>${campo.Telefono}<p></p>           
//                 <b>Código postal: </b>${campo.Codigo_Postal}<p></p>            
//                 <b>Precio: </b>${campo.Precio}<p></p>        
//                 <b>Tipo: </b>${campo.Tipo}<p></p>
//             </div>
//           </div>
//         </div>
//         `
//       }

//     },
//     error: function(data)
//     {
//       alert("paila no sirve...");
//     }
//   })
// })

//  ---------------------   PUNTO 2: Opciones de Filtro    ----------------------

function cargaFiltro()
{
  $.ajax(
  {
    url: "http://localhost:3000/filtros",
    type:"post",
    data: {},
  })
  .done(function(data)
  {
    // console.log(data);
    // console.log(data.ciudades);
    // console.log(data.tipo);

    for (i=0; i<data.ciudades.length; i++)
    {
      $("#ciudad").append("<option value='" + data.ciudades[i] + "'>" + data.ciudades[i]);
    }
    for (i=0; i<data.tipo.length; i++)
    {
      $("#tipo").append("<option value='" + data.tipo[i] + "'>" + data.tipo[i]);
    }
    $('select').formSelect();                                                              //Sirve para inizializar las listas desplegables select del formulario en el HTML ya con las opciones asignadas antes de ejecutar. Por eso se pone al final. Esto es código de materialize que dicen que hay que colocar para que funcione una vez cargadas todas las opciones

  })
  .fail(function(data)
  {
    console.log("pailander no sirve...", data);
  })
}


//  ------------------------        PUNTO 3: Filtros        ------------------------------

//  Función que inicializa el elemento Slider: Rango de precios del formulario
function inicializarSlider()
{
  $("#rangoPrecio").ionRangeSlider(
  {
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 100000,
    prefix: "$"
  });
}

//Switch que muestra y oculta las opciones de filtros:
function setSearch() 
{
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => 
  {
    if (this.customSearch == false) 
    {
      this.customSearch = true;
    } 
    else 
    {
      this.customSearch = false;
    }
    $('#personalizada').toggleClass('invisible')
  })
}

//Función guarda datos de busqueda:

$("#buscar").click(function()
{
  const slider = $("#rangoPrecio").data("ionRangeSlider");
  const precioMinimo = slider.result.from;
  const precioMaximo = slider.result.to;
  const filtroCiudad = $("#ciudad").val();
  const filtroTipo = $("#tipo").val();

  const ubicacion = `http://localhost:3000/buscar/?filtroCiudad=${filtroCiudad}&filtroTipo=${filtroTipo}&precioMinimo=${precioMinimo}&precioMaximo=${precioMaximo}`;    // el signo ? da inicio a la asignacion de variables que se cierra el nombre con =. Para añadir una nueva solo se agrega &

    $.ajax(
    {
      type: "post",
      url: ubicacion,
      data: {},
      success: function(data)
      {
        //console.log(data);
        let agregar = document.querySelector(".lista");
        agregar.innerHTML = "";
  
        for(let campo of data)
        {
          agregar.innerHTML += 
          `         
          <div class="card horizontal">
            <div class="card-image">
              <img src="img/home.jpg">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                  <b>Direccion: </b>${campo.Direccion}<p></p>
                  <b>Ciudad: </b>${campo.Ciudad}<p></p>             
                  <b>Telefono: </b>${campo.Telefono}<p></p>           
                  <b>Código postal: </b>${campo.Codigo_Postal}<p></p>            
                  <b>Precio: </b>${campo.Precio}<p></p>        
                  <b>Tipo: </b>${campo.Tipo}<p></p>
              </div>
            </div>
          </div>
          `
        }
  
      },
      error: function(data)
      {
        alert("paila no sirve...");
      }
    })

})
