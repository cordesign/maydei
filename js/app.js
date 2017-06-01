  // Initialize Firebase
var config = {
    apiKey: "AIzaSyA5MYTaffvsPsbAfE8cGWr6MoGpV2nYxXc",
    authDomain: "aulas-4b704.firebaseapp.com",
    databaseURL: "https://aulas-4b704.firebaseio.com",
    projectId: "aulas-4b704",
    storageBucket: "aulas-4b704.appspot.com",
    messagingSenderId: "96200739951"
};
app = firebase.initializeApp(config);

var progress = "splash";
var inited = false;
var user;

var openX, openY, closeX, closeY;
var tocar = false;
var score1, score2, score3

app.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        window.user = user;
        console.log("User:", user.uid);
        
        if (!inited) {
            inited = true;
            init();
        }
    } else { app.auth().signInAnonymously().catch(function(error) {
            console.log(error);
        });
    }
});





function init() {
    if(user.uid) {
        var userId = firebase.auth().currentUser.uid;
        loginScreen()
    }
    if(user.displayName) {
        var userName = firebase.auth().currentUser.displayName;
        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      score1 = snapshot.val().score1;
        
         if (score1 != 0) {
            gameScreen2();
        }   
  });
        gameScreen1();
        
    }
     
    console.log(user);
}

function writeUserData(userId, name, score1, score2,score3) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    score1: score1,
    score2 : score2,
    score3 : score3
  });
}


$(document).on('click','#jogar',function(){
       
    checkGameStart();
});

$(document).on("keydown", function() {
   if(event.keyCode == 13 && progress == "login"){
       checkGameStart();
   }
});


function checkGameStart() {
    $userInput = $("#user").val();
    
    if($userInput != "") {
          user.updateProfile({
          displayName: $userInput
        })
        
         gameScreen1();
    } else {
        tip = "<div style='opacity:0'>Introduz utilizador para continuar </div>";
        openMenu(0,88,40);
       window.setTimeout(function() {closeMenu(222,88) }, 1000); 
    }
    
}

var seq2 = new Array();
var dificuldade = 1;
var inicial = 2;

function comecarTocar () {
    seq2[0] = "#Snare"
    seq2[1] = "#LowTom"
    seq2[2] = "#HiHat"
    seq2[3] = "#crash"
    
    for(i = 0; i < inicial+dificuldade; i++) {
        window.setTimeout(function() {
            if(i >= inicial + dificuldade) {
                tocar = true;
            } else {
                tocar = false;
                
            }
            
            i = Math.floor(Math.random() * 4)  
            playSound(seq2[i]); 
        }, 2000*i);
        
        

    }
    
     
}

    
function loginScreen() {
    if(!user.uid) {
     writeUserData(user.uid, 0,0,0,0)
        
    }
    progress = "login";
    $(".splash").remove();  
    $(".helper").css("visibility", "visible");
    openX = 88;
    openY = 222;
     $('.helper').css("bottom", openX);
     $('.helper').css("left", openY);
    
}
$(document).on('click','img',function(e){
        console.log(e.toElement.id);
        if(tocar == false) {
            switch(e.toElement.id) {
                case "stan":
                    playSound("#Snare");
                    break;
                case "kyle":
                    playSound("#LowTom");
                    break;
                case "eric":
                    playSound("#HiHat");
                    break;
                case "kenny":
                    playSound("#crash");
                    break;
            }
        }
        
        
    })
function gameScreen1() {
    tocar = true;
    if(user.displayName) {
         $(".user").html(user.displayName);
    } else {
        $(".user").html($userInput);
    }
        $(".nivel").html("Dificuldade " + dificuldade);
    
    if(!user.displayName) {
    writeUserData(user.uid, user.displayName,0,0,0)
        
    }
    
    
       
                  
    progress = "game1"
    $(".game1").css("opacity", 0);
        $(".login").remove(); $("body").css("background","url(img/img2.jpg) no-repeat center center fixed");
        openX = -420;
        openY = 450;
    $(".helper").css("left", openX);
    $(".helper").css("bottom", openY);
   
       window.setTimeout(function() {
          $(".main").append(" <span class='count'>3</span>");
        contar();
    
          
          
     },500)
     window.setTimeout(function() {
         
     },500)
     
     $( document ).on("keydown", function(e) {
             if(e.key == 'a') {
                  playSound("#Snare");  
              } else if (e.key == 's') {          
                  playSound("#LowTom");       
              }else if (e.key == 'd') {
                  playSound("#HiHat");                 
              }else if (e.key == 'f') {
                  playSound("#crash");        
              }
})
}
343231123
var g =0;
var check = 0;

function endScreen() {
    $("body").html("");
}
function checkWin() {
    for(var i = 1; i<= seq.length/2;i++) {
        if(seq[i] == seq[i+inicial+dificuldade] ){ //seq tiver certa
            check++;
            console.log(check)
            if(check ==inicial+dificuldade -1  ) {
                dificuldade+=2;
            }
              if(dificuldade >= 9) {
                  score = 100;
                   writeUserData(user.uid, user.displayName,score,0,0)
                   gameScreen2();
               } 
               
            
        } else {
            gameScreen1();
            seq = [];
            g= 0;
        }
    }
}
var seq = new Array();
function playSound(instrumento) {
   
    g++;
    if(g==(inicial + dificuldade)*2) {
        checkWin();
    }
    
    if(g==(inicial + dificuldade)) {
        $(".game1").css("opacity", 1);
    }
     var audio = $(instrumento).find("audio").get(0);
    
     audio = audio.cloneNode();
    audio.play();
    console.log(instrumento);
    
    switch(instrumento) {
        case "#LowTom":
             $("#kyle").attr("src", "img/fig2-selecionado.png");
            seq[g] = instrumento;
            window.setTimeout(function() {
                $("#kyle").attr("src", "img/fig2.png");
             
            }, 1500)
            break;
        case "#crash":
             $("#kenny").attr("src", "img/fig4-selecionado.png");
            seq[g] = instrumento;
            window.setTimeout(function() {
                $("#kenny").attr("src", "img/fig4.png");
            }, 1500)
            break;
        case "#Snare":
             $("#stan").attr("src", "img/fig1-selecionado.png");
            seq[g] = instrumento;
            window.setTimeout(function() {
                $("#stan").attr("src", "img/fig1.png");
            }, 1500)
            break;
        case "#HiHat":
             $("#eric").attr("src", "img/fig3-selecionado.png");
            seq[g] = instrumento;
            window.setTimeout(function() {
                $("#eric").attr("src", "img/fig3.png");
            }, 1500)
    }
   
            }

function gameScreen2() {
    if(score1 != 0) {
        
    writeUserData(user.uid, user.displayName,score1,0,0)
    }
    window.location.href = "/MAYDEI/app/index.html";
}
$(document).on('mouseenter','.helper',function(){   
    switch(progress) {
        case "login":
            tip = "<p>Neste jogo és a personagem principal. Completa uma série de desafios para te licenciares a design e multimédia!</p>"
            openX = 0;
            openY = 88;
            
            closeX = 222;
            closeY = 88;
            break;
            
        case "game1":
            
            openX = -350;
            openY = 450;
            
            closeX = -400;
            closeY = 450;
            
            tip = "<p>Utiliza as teclas a,s,d,f ou clica nas imagens para reproduzir sons. Repete a ordem para avançar para o próximo nível.</p>";
            break;
        case "game2":
            tip = "<p>Resolve o puzzle para finalizar o jogo.</p>";
            break;
    }
    openMenu(openX,openY,110);
    
});
$(document).on('mouseleave','.helper',function(){
    closeMenu(closeX,closeY);
});

function closeMenu(left,right) {
     $('.helper').html("?");
    $('.helper').css("transition", "all 225ms ease-in");
     $('.helper').css("width", "33px");
     $('.helper').css("height", "33px");
     $('.helper').css("left", left);
     $('.helper').css("bottom", right);
}

function openMenu(left,bottom,height) {
    $(".helper").html(tip); 
    window.setTimeout(function() { 
             $("p").css("opacity" , 1)
    }, 222);
     $('.helper').css("height", height);
    $('.helper').css("transition", "all 225ms ease-in");
    $('.helper').css("width", "330px");
    
    $(".helper").css("left", left);
    $(".helper").css("bottom", bottom);
        window.setTimeout(function() { 
             $(".helper div").css("opacity" , 1)
    }, 222);
}

function contar() {
    
    $('.count').each(function () {
        $(this).prop('Counter',$(this).text()).animate({
            Counter: 0
        }, {
            duration: 3000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
                if($(this).text() == 0) {
                    
                        $(".game1").css("opacity", 0.75);
                    $(".count").remove();
                    window.setTimeout(function() {
                        comecarTocar();
                    }, 1000)
                     
                }
            }
        });
    });
}