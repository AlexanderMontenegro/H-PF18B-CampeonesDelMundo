export default function validation(inputs){
    const errors = {};
    const regexLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i;
    const regex3 = /.{3,}/;
    //validacion tipo
    if (!regexLetras.test(inputs.tipo)) {
        errors.tipo = 'Debe ser un tipo'
    }
    if (!inputs.tipo) {
        errors.tipo = 'El tipo no puede estar vacio'}
    if (!regex3.test(inputs.tipo)) {
        errors.tipo = 'Debe tener mas de 3 caracteres'}

    //validacion marca
    if (!regexLetras.test(inputs.tipo)) {
        errors.tipo = 'Debe ser una marca'
    }
    if (!inputs.marca) {
        errors.marca = 'marca no puede estar vacio'}
    if (!regex3.test(inputs.marca)) {
        errors.marca = 'Debe tener mas de 3 caracteres'}

    //validacion imagen 
    if(inputs.imagen === ''){
        errors.imagen = 'Inserta URL de Imagen';
    }

    //validation descripcion
    if(inputs.descripcion === '')
    {errors.descripcion = 'Añade descripcion';}

return errors;
}