var Ore;
var Minuti;
var Secondi;
var init=true;
var last_sec;
var myFont;

function preload() {
  myFont = loadFont('assets/Mostra Nuova Bold.otf');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(160,50,240);
  angleMode(DEGREES);
  if(windowWidth>windowHeight){
    Ore = new Quadrante((windowHeight*(5/6)),windowHeight/7,24);
    Minuti = new Quadrante((windowHeight*(4/6)),windowHeight/7,60);
    Secondi = new Quadrante((windowHeight*(1/2)),windowHeight/7,60);
  }else{
    Ore = new Quadrante((windowWidth*(1/2)),windowWidth/7,24);
    Minuti = new Quadrante((windowWidth*(4/6)),windowWidth/7,60);
    Secondi = new Quadrante(windowWidth*(5/6),windowWidth/7,60);
  }
  frameRate(24);
  last_sec=second();
}

function draw() {
  background(34,39,230);
  textFont(myFont);
  if(windowWidth>windowHeight){
    stroke(255,0,0);
    fill(200,40,40);
    triangle((-windowWidth/40)+(windowWidth/2),windowHeight*(1/20),windowWidth/2,windowHeight-(windowHeight*(5/6)),(windowWidth/40)+(windowWidth/2),windowHeight*(1/20));
    push();
      translate(width/2,height);
      rotate(-90);
      push();
      //translate(width/6,height/2);
      Ore.ruota_ore();
      Ore.display();
      pop();
      
      push();
      Minuti.ruota_minuti();
      Minuti.display();
      pop();
      
      push();
      //translate(width*(5/6),height/2);
      Secondi.ruota_secondi();
      Secondi.display();
      pop();
    pop();
    stroke(255,0,0);
    fill(200,0,0);
    triangle((-windowWidth/60)+(windowWidth/2),(windowHeight*(1/12))+(windowHeight*(1/2))+(windowHeight/7),(windowWidth/2),(windowHeight*(1/2))+(windowHeight/7),(windowWidth/60)+(windowWidth/2),(windowHeight*(1/12))+(windowHeight*(1/2))+(windowHeight/7));
  }else{
    stroke(255,0,0);
    fill(200,40,40);
    triangle(windowWidth*(5/6),windowHeight/2,windowWidth-windowWidth*(1/20),(windowHeight/2)-(windowHeight*(1/20)),windowWidth-windowWidth*(1/20),(windowHeight/2)+(windowHeight*(1/20)));
    push();
      translate(0,height/2);
      rotate(0);
      push();
      //translate(width*(5/6),height/2);
      Secondi.ruota_secondi();
      Secondi.display();
      pop();
      
      push();
      Minuti.ruota_minuti();
      Minuti.display();
      pop();
      
      push();
      //translate(width/6,height/2);
      Ore.ruota_ore();
      Ore.display();
      console.log(init);
      pop();
    pop();
    stroke(255,0,0);
    fill(200,0,0);
    triangle(windowWidth*(1/2)-(windowWidth/7),windowHeight/2,windowWidth*(1/2)-windowWidth*(1/4),(windowHeight/2)-(windowHeight*(1/20)),windowWidth*(1/2)-windowWidth*(1/4),(windowHeight/2)+(windowHeight*(1/20)));
  }
  
}

function raggi(r,raggio2,divisioni){
  for(var i=0;i<360;i+=(360/divisioni)){
    push();
    rotate(i);
    translate((r)-raggio2,0);
    line(0,0,r-(r-raggio2),0);
    noFill();
    pop();
  }
  
}

function numeri(r,r2,divisioni){
  var aux=1;
  push();
  //rotate(-((360/divisioni/2)));
  for(var i=0;i<360;i+=(360/divisioni)){
    push();
    noStroke();
    rotate(i+((360/divisioni)/2));
    textSize((sin(360/divisioni)*r)/2);
    
    if(windowWidth>windowHeight){
      translate((r)-(r2/4),0);
    }else{
      translate((r)-(r2/2),0);
    }
    if(windowWidth>windowHeight){
      rotate(90);
    }else{
    }
    stroke(200,0,0);
    if(windowWidth>windowHeight){
      textAlign(CENTER);
      //rect(-abs(sin((360/divisioni/2))*r),0,abs(sin(360/divisioni)*r),r);
      noStroke();
      fill(0,0,0);
      text(aux,-abs(sin((360/divisioni/2))*r)*2,0,abs(sin(360/divisioni)*r)*2,r/5);
    }else{
      textAlign(CENTER,CENTER);
      //rect(-r/10,-abs(sin((360/divisioni/2))*r),r/5,abs(sin(360/divisioni)*r));
      noStroke();
      fill(0,0,0);
      text(aux,-r/10,-abs(sin((360/divisioni/2))*r),r/5,abs(sin(360/divisioni)*r));
    }
    
    
    //rect(0,0,40,40);
    //text(aux,-cos(360/divisioni)*r/2,0,cos(360/divisioni)*r/2,40);
    aux++;
    noFill();
    
    pop();
  }
  
  pop();
}

function Quadrante(r,r2,div){
    this.raggio=r;
    this.raggio2=r2;
    this.divisioni=div;
    last_ora=hour();
    last_min=minute();
    
    this.ruota_ore=function(){
      this.last_ora=hour();
      if(init==true){
        rotate(-(((360/div)*(hour()-1))+((360/div)/2)));
        
      }else{
        rotate(-(((360/div)*(hour()-1))+((360/div)/2)));
        if(this.last_ora!=hour())
          while(((frameCount%(360/div))<(360/div))){
             console.log("---------");
          }
      }
    }
    this.ruota_minuti=function(){
      this.last_min=minute();
      if(init==true){
        rotate(-(((360/div)*(minute()-1))+((360/div)/2)));
      }else{
        rotate(-(((360/div)*(minute()-1))+((360/div)/2)));
        if(this.last_min!=minute())
          while(((frameCount%(360/div))<(360/div))){
          }
      }
    }
    this.ruota_secondi=function(){
      var aux;
      if(init==true){
        aux=last_sec;
        rotate(-((360/div)*(aux))-((360/div)/2));
        //console.log(init);
        init=false;
        
      }else{
        rotate(-((millis()/1000)*(360/div))-((last_sec-1)*(360/div)));
      }
    }
    this.display = function(){
      stroke(237,226,22);
      strokeWeight(r/200);
      fill(240,255,255);
      ellipse(0,0,r*2,r*2);
      
      noFill();
      strokeWeight(r/900);
      stroke(0,0,0);
      ellipse(0,0,r*2,r*2);
      
      raggi(this.raggio,this.raggio2,this.divisioni);
      numeri(this.raggio,this.raggio2,this.divisioni);
      
      strokeWeight(r/500);
      fill(34,39,230);
      stroke(0,0,0);
      if(windowWidth>windowHeight){
        ellipse(0,0,(r*2)-(2*this.raggio2),(r*2)-(2*this.raggio2));
      }else{
        ellipse(0,0,(r*2)-(2*this.raggio2),(r*2)-(2*this.raggio2));
      }
      
      noFill();
      strokeWeight(r/500);
      stroke(237,226,22);
      ellipse(0,0,this.raggio-50,this.raggio-50);
    }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
  init=true;
  if(windowWidth>windowHeight){
    Ore = new Quadrante((windowHeight*(5/6)),windowHeight/7,24);
    Minuti = new Quadrante((windowHeight*(4/6)),windowHeight/7,60);
    Secondi = new Quadrante((windowHeight*(1/2)),windowHeight/7,60);;
  }else{
    Ore = new Quadrante((windowWidth*(1/2)),windowWidth/7,24);
    Minuti = new Quadrante((windowWidth*(4/6)),windowWidth/7,60);
    Secondi = new Quadrante(windowWidth*(5/6),windowWidth/7,60);
  }
  redraw();
  console.log(last_sec);
}