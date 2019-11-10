function editarEstudiante(id){
    var estudiante;

    for(var i = 0; i < localStorage.length; i++){
    var clave = localStorage.key(i);

    if(clave == id){

      estudiante = $.parseJSON(localStorage.getItem(clave));
      $("#id").val(estudiante.id);
      $("#nombre").val(estudiante.nombre);
      $("#nota").val(estudiante.nota);

        }
    }
}

function listarEstudiantes(){

    var tabla = "";
    var parrafo = $("#p1");

    tabla += '<table align="center" border="1">';
    tabla += '<tr>';
    tabla += '<th>Codigo</th>';
    tabla += '<th>Nombre</th>';
    tabla += '<th>Nota</th>';
    tabla += '<th>Editar</th>';
    tabla += '<th>Eliminar</th>';
    tabla += '</tr>';

for(var i = 0; i < localStorage.length; i++){

    var clave = localStorage.key(i);
    var estudiante = $.parseJSON(localStorage.getItem(clave));

    tabla += '<tr>';
    tabla += '<td>'+estudiante.id+'</td>';
    tabla += '<td>'+estudiante.nombre+'</td>';
    tabla += '<td>'+estudiante.nota+'</td>';
    tabla += '<td><button onclick="editarEstudiante(\''+estudiante.id+'\');">Editar</button></td>';
    tabla += '<td><button onclick="eliminarEstudiante(\''+estudiante.id+'\');">Eliminar</button></td>';
    tabla += '</tr>';
}

    tabla += '</table>';

$(parrafo).html(tabla);
    
}

function eliminarEstudiante(id){

    localStorage.removeItem(id);
    listarEstudiantes();
    
}


$(document).ready(function(){

    var contador;

    if(localStorage.length > 0){
        contador = localStorage.length + 1;
    }else{
        contador = 1;
    }

    $("#id").val(contador);

    $("#registroEstudiantes").click(function(){

        var id = $("#id").val();
        var nombre = $("#nombre").val();
        var nota = $("#nota").val();

        var estudiante = {
            id:id,
            nombre:nombre,
            nota:nota
        };

        localStorage.setItem(id, JSON.stringify(estudiante));
        contador = localStorage.length + 1;
        listarEstudiantes();
        restablecer();
    });

    $("#btn").click(function() {
        restablecer(9);
      });
    
      function restablecer() {
        $("#id").val(contador);
        $("#nombre").val("");
        $("#nota").val("");
      }
    
      listarEstudiantes();
      $("#id").val();

      $("#promedioEstudiantes").click(function(){
            var total = 0;
            var promedio = 0;

            for(var i = 0; i < localStorage.length; i++){

                var clave = localStorage.key(i);
                var estudiante = $.parseJSON(localStorage.getItem(clave));

                total += parseInt(estudiante.nota, 10);
                promedio = total / localStorage.length; 
            }

        $("#resultado").html("El promedio de los estudiantes es: " + promedio);    

    });

    $("#notaMayorEstudiantes").click(function(){

        let nota_mayor = 0;
        let nombre_estudiante = '';
    
        for(var i = 0; i < localStorage.length; i++){

            let clave = localStorage.key(i);
            let estudiante = $.parseJSON(localStorage.getItem(clave));

                if(nota_mayor < estudiante.nota){
                    nota_mayor = estudiante.nota;
                    nombre_estudiante = estudiante.nombre;
                }           

        }

         $("#resultadoNotaMayor").html("El estudiante con la nota mas alta es: " + nombre_estudiante + "y su nota es: " + nota_mayor);   
    
    });

    $("#notaMenorEstudiantes").click(function() {

        var estudianteMenor = $.parseJSON(localStorage.getItem(localStorage.key(0)))
    
        for(var i = 0; i < localStorage.length; i++) {              
          var clave = localStorage.key(i);
          var estudiante = $.parseJSON(localStorage.getItem(clave));
    
          if(Number(estudianteMenor.nota) > Number(estudiante.nota)) {     
            estudianteMenor = estudiante
          }
        }
        $("#resultadoNotaMenor").html("El estudiante con la nota mas baja es: " + estudianteMenor.nombre + " " + "y su nota es:" +estudianteMenor.nota);
    });

});


    
            


   
