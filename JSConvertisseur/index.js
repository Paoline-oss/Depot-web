function Convertisseur(){
    const euro = document.getElementById("euro");
    const dollar_am = document.getElementById("dollar_am");
    const dollar_aus  = document.getElementById("dollar_aus");
    dollar_aus.value =euro.value*1.78;
    dollar_am.value = euro.value*1.17;

}
function Convertisseur2(){
    const euro = document.getElementById("euro2");
    const dollar_am = document.getElementById("dollar_am2");
    const dollar_aus = document.getElementById("dollar_aus2");
    if(euro.value.trim() ===""){
        dollar_am.value=0;
        dollar_aus.value=0;
    }else{
        dollar_aus.value =euro.value*1.78;
        dollar_am.value = euro.value*1.17;
    }
}
