let correcto=true
let errorDesc=document.getElementById("errorDesc");
let errorFecha=document.getElementById("errorFecha")
let errorOrga=document.getElementById("errorOrga")
let errorCarac=document.getElementById("errorCarac")
let errorOb=document.getElementById("errorOb")
const validacionModalCrearCassete=()=>{
    if(desc.validity.valueMissing){
        console.log("Falta desc")
        errorDesc.textContent="Debes cumplimentar la descripcion"
        correcto=false
    }else{
        errorDesc.textContent=""
    }
    if(date.validity.valueMissing){
        console.log("Falta date")
         errorFecha.textContent="Debes seleccionar la fecha"
        correcto=false
    }else{
        errorFecha.textContent=""
    }
    if(selectOrganoCassete.validity.valueMissing){
        console.log("Falta organo")
         errorOrga.textContent="Debes seleccionar un organo"
        correcto=false
    }else{
        errorOrga.textContent=""
    }
    if(carac.validity.valueMissing){
        console.log("Falta carcaterisctica")
        errorCarac.textContent="Debes poner las caracteristicas"
        correcto=false
    }else{
         errorCarac.textContent=""
    }
    if(ob.validity.valueMissing){
        console.log("Falta observaciones")
        errorOb.textContent="Debes poner las observaciones"
        correcto=false
    }else{
         errorOb.textContent=""
    }


    return correcto
}



