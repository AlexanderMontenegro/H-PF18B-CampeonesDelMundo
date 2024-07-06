
export default function validation(inputs){
const errors = {};

//validacion email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(inputs.email)) 
{errors.email = 'Debe ser un Email'}

if (!inputs.email) 
{errors.email = 'Escribi tu Email'}

//validacion password
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
if (!passwordRegex.test(inputs.password)) {
errors.password = 'Debe se 6 caracteres, un numero, una letra mayuscula y minuscula'}

if (!inputs.password) 
    {errors.password = 'Escribi tu password'}

//validacion confirmPassword
if (inputs.password!==inputs.confirmPassword) {
errors.confirmPassword = 'Passwords no coinciden'}

if (!inputs.confirmPassword) 
    {errors.confirmPassword = 'Confirma tu Password'}

const regexLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/i;
const regex5 = /.{5,}/;
//validacion name
if (!regexLetras.test(inputs.name)) {
    errors.name = 'Escribi un nombre '
}
if (!inputs.name) {
    errors.name = 'Escribi tu Nombre'}
if (!regex5.test(inputs.name)) {
    errors.name = 'Debe tener mas de 5 caracteres'}

//validacion address
if (!inputs.address) {
errors.address = 'Escribi tu direccion'}

    //validacion cellphone
    const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    ;

    if (!phoneNumberRegex.test(inputs.cellphone)) {
        errors.cellphone = 'Debe ser un cellphone formato +xx xxx'
    }
    if (!inputs.cellphone) {
        errors.cellphone = 'Escribi tu cellphone'}


return errors;
}