let correcto=true
//Variables para los mensaje de error de la modal de crear Cassete
let errorDesc=document.getElementById("errorDesc");
let errorFecha=document.getElementById("errorFecha")
let errorOrga=document.getElementById("errorOrga")
let errorCarac=document.getElementById("errorCarac")
let errorOb=document.getElementById("errorOb")
//Variables para los mensaje de error de la modal modificar Cassete
let errorDescMod=document.getElementById("errorDescMod")
let errorFechaMod=document.getElementById("errorFechaMod")
let errorOrgaMod=document.getElementById("errorOrgaMod")
let errorCaracMod=document.getElementById("errorCaracMod")
let errorObMod=document.getElementById("errorObMod")
//Funcion para validar el formulario de crear cassete
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
//Funcion para validar el formulario de modificar cassete
const validacionModalUpdateCassete=()=>{
    if(desM.validity.valueMissing){
        console.log("Falta desc")
        errorDescMod.textContent="Debes cumplimentar la descripcion"
        correcto=false
    }else{
        errorDescMod.textContent=""
    }
    if(dateM.validity.valueMissing){
        console.log("Falta date")
         errorFechaMod.textContent="Debes seleccionar la fecha"
        correcto=false
    }else{
        errorFechaMod.textContent=""
    }
    if(selecOrMod.validity.valueMissing){
        console.log("Falta organo")
         errorOrgaMod.textContent="Debes seleccionar un organo"
        correcto=false
    }else{
        errorOrgaMod.textContent=""
    }
    if(caracMod.validity.valueMissing){
        console.log("Falta carcaterisctica")
        errorCaracMod.textContent="Debes poner las caracteristicas"
        correcto=false
    }else{
         errorCaracMod.textContent=""
    }
    if(obMod.validity.valueMissing){
        console.log("Falta observaciones")
        errorObMod.textContent="Debes poner las observaciones"
        correcto=false
    }else{
         errorObMod.textContent=""
    }


    return correcto
}



