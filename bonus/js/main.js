let numeri_vietati=[];
let numeri_scelti=[];
let numero_bombe=16;
let max=100;
let min=1
//let dificolta=scelta_dificolta();
let contatore=0;
let giocate;
document.getElementById("start").addEventListener("click",start);
/*
document.getElementById("numero").addEventListener("keyup", function(event) {
  Number 13 is the "Enter" key on the keyboard
  let num;
  if (event.keyCode === 13) {
    Cancel the default action, if needed
    event.preventDefault();
    Trigger the button element with a click
    num=parseInt(document.getElementById("numero").value);
    if(num!="" && !(controllo_giocatore(numeri_scelti,parseInt(num)))){
        numeri_scelti.push(parseInt(num));
    }
    controllo_fail(numeri_vietati,parseInt(num));
  }
});
*/



//funzioni================================================================

function generatore_random(mi,ma){
    return Math.floor(Math.random() * (ma - mi + 1) ) + mi;
}

function controllo_no_ripetizioni(array1){
    let num;
    do{
        num=generatore_random(min,max);
    }while(array1.includes(num))
    return num;
}

function controllo_giocatore(array,n){
    if(array.includes(n))return true;
    return false;
}

function controllo_fail(array,n){
    if(array.includes(n)){
        document.getElementById("gui_game").className=document.getElementById("gui_game").classList+" none";
        document.getElementById("message").innerHTML="hai perso "+contatore;
        document.getElementById("numeri_vietati").innerHTML=numeri_vietati;
        document.getElementById("numeri_scelti").innerHTML=numeri_scelti;
        document.getElementById("gui_fail").classList.remove("none");
        return false;
    }
    contatore++;
    if(contatore==giocate){
        document.getElementById("gui_game").className=document.getElementById("gui_game").classList+" none";
        document.getElementById("message").innerHTML="hai vinto "+contatore;
        document.getElementById("numeri_vietati").innerHTML=numeri_vietati;
        document.getElementById("numeri_scelti").innerHTML=numeri_scelti;
        document.getElementById("gui_fail").classList.remove("none");
    }
    return true 
}

function reset_gui(){
    document.getElementById("gui_game").innerHTML=""
}

function create_gui_game(){
    for (let i=1;i<=max;i++){
        let cella=`
            <div data-cella="${i}" class="cella"></div>
        `;
        let template=document.createElement("DIV");
        template.classList.add("quadrato");
        template.innerHTML = cella;
        document.getElementById("gui_game").appendChild(template);
    }
}

function controllo_intorno(num,indicatore){
    //sopra
    let contatore_bombe=0;
    num=parseInt(num);
    for (let i=num-9;i>=num-11;i--){
        if(i>0 && i<101){
            if(controllo_giocatore(numeri_vietati,parseInt(i))){
                contatore_bombe++;
            }
        }
    }
    for (let i=num+1;i>=num-1;i--){
        if(i>0 && i<101){
            if(controllo_giocatore(numeri_vietati,parseInt(i))){
                contatore_bombe++;
            }
        }
    }
    for (let i=num+9;i<=num+11;i++){
        if(i>0 && i<101){
            if(controllo_giocatore(numeri_vietati,parseInt(i))){
                contatore_bombe++;
            }
        }
    }
    indicatore.innerHTML=contatore_bombe;
}

document.getElementById("gui_game").addEventListener("click",
    function(e){
        let num=e.target.dataset.cella;
        if(!(controllo_giocatore(numeri_scelti,parseInt(num)))){
            numeri_scelti.push(parseInt(num))
            if(controllo_fail(numeri_vietati,parseInt(num))){
                e.target.classList.add("bg-success")
            }
        }
        controllo_intorno(num,e.target)
    }
)


function start(){
    numeri_vietati=[];
    numeri_scelti=[];
    document.getElementById("gui_fail").className=document.getElementById("gui_fail").classList+" none";
    let difficolta = document.getElementById("dificolta").value
    if(difficolta==1){
        max=100;
    }else if(difficolta==2){
        max=80;
    }else if(difficolta==3){
        max=50;
    }
    giocate=max-numero_bombe;
    for (let i=0; i<numero_bombe;i++) {
        numeri_vietati.push(controllo_no_ripetizioni(numeri_vietati));
    }
    contatore=0;
    reset_gui();
    create_gui_game();
    document.getElementById("gui_game").classList.remove("none");
}