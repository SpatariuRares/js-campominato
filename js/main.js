let numeri_vietati=[];
let numeri_scelti=[];
let numero_bombe=10;
let max=10;
let min=1

for (let i=0; i<numero_bombe;i++) {
    numeri_vietati.push(controllo_no_ripetizioni(numeri_vietati));
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