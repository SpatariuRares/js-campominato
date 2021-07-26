let numeri_vietati=[];
let numeri_scelti=[];
let numero_bombe=16;
let max=100;
let min=1
let numeri_totali=100;
let giocate=numeri_totali-numero_bombe;
let contatore=0;
for (let i=0; i<numero_bombe;i++) {
    numeri_vietati.push(controllo_no_ripetizioni(numeri_vietati));
}
let fail=false;
for (let i=0; i<giocate && fail==false; i++) {
    let num=0;
    do{
        num=prompt("inserisi un numero da 1 a 100");
    }while(isNaN(num) || num=="" || (parseInt(num)<=0 || parseInt(num)>100) || controllo_giocatore(numeri_scelti,parseInt(num)));
    numeri_scelti.push(parseInt(num));
    fail=controllo_fail(numeri_vietati,parseInt(num));
    contatore++;
}

if(fail==false){
    console.log("hai vinto"+ contatore);
}else{
    console.log("hai perso "+ --contatore);
}



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
    if(array.includes(n))return true;
    return false;
}