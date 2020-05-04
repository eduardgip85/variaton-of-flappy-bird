function myFunction(){
  var personaje = document.getElementById("person");
  var score = document.getElementById("score");
  var colisiones = document.getElementById("colisiones");
  var up = document.getElementById("btn-up");
  var down = document.getElementById("btn-down");
  var tuberiaA = document.getElementById("tuberia");
  var tuberiaB = document.getElementById("tuberia_abajo");
  var invencible = false; //tema invulnerabilidad
  var puntos = document.getElementById("puntuacion");
  
  //tema modal
  var menumodal = document.getElementById("modal");
  var puntosmodal = document.getElementById("puntosmodal");
  var volverjugar = document.getElementById("buttonmodal");
  
  up.onclick=subir;
  down.onclick=bajar;
  volverjugar.onclick=rejugar;
  
  var personaje_y = 720;
  var tuberia_x = 2940; //donde han de empezar las tuberias en X
  var choques = 0; //las colisiones
  var tocado = false; //tema tuberia 
  var puntuacion = 0;  //la puntuacion
  var fin = false;
  
  var img1 = document.getElementById('vida1');
  var img2 = document.getElementById('vida2');
  var img3 = document.getElementById('vida3');
  
  var movertub = setTimeout(movertuberias,10);
  var moverperson = setTimeout(mover,20);
  var colisions = setTimeout(colision,10);
  menumodal.style.display = "none";
  
  function subir(){ //subir el personaje
  
    document.querySelector("#person").dataset.orientacion = "subir";
    //setTimeout(mover,20);
    
  }
  
  function bajar(){ //bajar el personaje
    document.querySelector("#person").dataset.orientacion = "bajar";
    //setTimeout(mover,20);
  }
  
  function movertuberias(){ //tuberia		
  
        if(tuberia_x >= 450){
          
          if(tocado === true){ //quan las tuberias arriban al principi tornan al final aleatori
            var ale = numeroRandom();
            var ale2 = numeroRandom2();
            tuberiaA.style.height= ale+"px";
            tuberiaB.style.top = ale2+"px";
            tuberiaB.style.height= (1560 - ale2 + 120)+"px";
            tocado = false;
          }
        
          tuberia_x-=5;
          tuberiaA.style.left=tuberia_x+"px";
          tuberiaB.style.left=tuberia_x+"px";
          
          if(puntuacion<=2){
            movertub = setTimeout(movertuberias, 10);
          }else{
            movertub = setTimeout(movertuberias, 5);
          }
          
         }
        
        if(tuberia_x == 450){
          tocado = true;
          tuberia_x=2940;
        }
  }
    
  
  function mover(){
  
    personaje.style.top=personaje_y+"px";
    
    if(document.querySelector("#person").dataset.orientacion == "subir"){
      if(personaje_y != 0){
        personaje_y = personaje_y - 5;
      } 
    }else{
      if(personaje_y <= 1555){
        personaje_y = personaje_y + 5;
      }
    }
    setTimeout(mover,20);
    //score.innerHTML = personaje_y;
    
  }
  
  function colision(){
  
    var tub_h = document.getElementById("tuberia").clientHeight;
    var tub_hb = document.getElementById("tuberia_abajo").clientHeight;
    var tub_x = tuberia.style.left;
    var res = Number(tub_x.replace("px", ""));
    var espacio = tuberiaB.offsetTop;
    
    //tema colision parte superior
    if(personaje_y <= tub_h && res <= 570 && invencible == false){
      choques++;
      invencible = true;
      document.getElementById("person").style.backgroundColor = "red";
      setTimeout(vulnerable,750);
      //colisiones.innerHTML = "Colisiones: " + choques;
    }
    
    //tema colision parte inferior
    if((personaje_y+20) >= (espacio-120) && res <= 570 && invencible == false){
    
      choques++;
      invencible=true;
      document.getElementById("person").style.backgroundColor="red";
      setTimeout(vulnerable,750);
      //colisiones.innerHTML = "Colisiones: "+choques;
    }
    
    //tema puntuacion
    if(res <= 570 && ((personaje_y+20) >= espacio) == false && invencible == false){
      puntuacion++;
      invencible=true;
      setTimeout(vulnerable,750);
      //puntos.innerHTML = "Puntos: "+puntuacion;
    }
    
    //tema restar vidas
    switch (choques){
      case 1: 
         img1.style.visibility = 'hidden';
        break;
      case 2:
         img2.style.visibility = 'hidden';
        break;
      case 3:
        img3.style.visibility = 'hidden';
        fin = true;
        break;
    }
    
    if(fin === false){
      colisions = setTimeout(colision,10);
    }else{
      clearTimeout(colisions);
      clearTimeout(movertub);
      menumodal.style.display = "inherit";
      
      var frase;

      if(puntuacion < 5 ){
        frase = "No has arribat a molta gent";
      }else{
        if(puntuacion <10){
          frase = "T'escolten per tota Barcelona";
        }else{
          if(puntuacion < 15){
            frase = "T'escolten per tota Catalunya";
          }
        }
      }
      puntosmodal.innerHTML= "La teva puntuació ha sigut: " + 
      "</br>"+  puntuacion + "</br>" + frase;
    }
    
    
  }
  
  function vulnerable(){ //si entra aqui es que ha chocado con una tuberia
    document.getElementById("person").style.backgroundColor = "";
    invencible = false;
  }
  
  function numeroRandom() { //numero entre 120 y 546 (incluidos los dos) 
    //para cambiar dificultad cambiar el 91 a mas alto
    return Math.random() * (750 - 120) + 120;
  }
  
  function numeroRandom2() { //numero entre 150 y 240 (incluidos los dos)
    //para cambiar dificultat cambiar el 150 a mas bajo
    return Math.random() * (1446 - 900) + 900;
  }
  
  function rejugar(){
    fin = false;
    choques = 0;
    puntuacion = 0;
    personaje_y = 720;
    img1.style.visibility = 'visible';
    img2.style.visibility = 'visible';
    img3.style.visibility = 'visible';
    //colisiones.innerHTML = "Colisiones: " + choques;
    //puntos.innerHTML = "Puntos: "+puntuacion;
    tuberia_x = 2940;
    movertub = setTimeout(movertuberias, 10);
    colisions = setTimeout(colision,10);
    menumodal.style.display= "none";
    
  }
  
    
}