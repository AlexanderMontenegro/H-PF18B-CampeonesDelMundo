export default function Validation(inputs){
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

    //validacion tipo
    if (!regexLetras.test(inputs.marca)) {
        errors.tipo = 'Debe ser una marca'
    }
    if (!inputs.marca) {
        errors.marca = 'marca no puede estar vacio'}
    if (!regex3.test(inputs.marca)) {
        errors.marca = 'Debe tener mas de 3 caracteres'}

        //validation categoria
if(!inputs.categoria)
    {errors.categoria = 'Selecciona categorias';}

return errors;
}