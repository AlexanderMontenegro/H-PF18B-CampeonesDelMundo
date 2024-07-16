import { useState } from "react";

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
    if (!regexLetras.test(inputs.marca)) {
        errors.marca = 'Debe ser una marca'
    }
    if (!inputs.marca) {
        errors.marca = 'marca no puede estar vacio'}
    if (!regex3.test(inputs.marca)) {
        errors.marca = 'Debe tener mas de 3 caracteres'}

    //validacion imagen con cloudinary
    if(inputs.imagen==='')
        {errors.imagen='Subi una imagen o pega Url de Imagen'}

    //validacion imagen
//     const regexImg = /^data:image\/(png|jpeg|jpg);base64,/;
/* const imageUrlRegex = /\.(jpeg|jpg|png)$/;
if(imageUrlRegex.test(inputs.imagen)){ */
        //errors.imagen = 'Inserta URL de Imagen Formato valido "png, jpeg, jpg" ';
        //errors.imagen = false;
    
/*         const imagenValidator = async (objeto) => {
            try {
                const response = await fetch(objeto.url, { method: 'HEAD' });
        
                if (response.ok) {
                    console.log('La solicitud a la URL falló con estado:', response.status);
                    objeto.imagen = true;
                    errorsO.imagen='La solicitud a la URL falló';
                    return 0;
                } else {
                    const contentType = response.headers.get('content-type');
        
                    if (contentType && contentType.startsWith('image/')) {
                        console.log('La URL contiene una imagen válida de tipo: ');
                        objeto.imagen = false;
                        //delete objeto.imagen;
                        //delete objeto.url;
                    } else {
                        console.log(`La URL no contiene una imagen válida.`);
                        objeto.imagen = true;
                        errorsO.imagen = 'La URL no contiene una imagen válida.';
                    }
                }
            } catch(error) {
                console.log('Error al verificar la URL de la imagen:', error);
                objeto.error =' Error al verificar la URL de la imagen';
                return errorsO.imagen = 'Error al verificar la URL de la imagen:';
            }
                
                
        }; */
        
        // Objeto inicial con la URL a verificar
        //const objetoInicial = {
           // url: 'https://example.com/image.jpg',
           // isValid: false // Puedes inicializarlo como false u undefined dependiendo de tus necesidades
        //};
        
        // Función para verificar y actualizar el objeto
  /*       const verificarYActualizar = async (objeto) => {
            await imagenValidator(objeto);
            console.log('errors sfsdsd', errorsO)
        
            // Dependiendo del resultado, puedes hacer algo con el objeto actualizado
            if (objeto.imagen) {
                console.log('La URL contiene una imagen no válida. Objeto actualizado:', objeto);
                // Aquí podrías almacenar el objeto actualizado en una base de datos o realizar otras operaciones
            } else {
                console.log('La URL contiene una imagen válida. Objeto actualizado:', objeto);
                // Manejar el error o la URL inválida según sea necesario
            }
        };
        
        // Llamar a la función para verificar y actualizar el objeto inicial
        verificarYActualizar( {url: inputs.imagen,
            imagen: true});
        console.log('errors',errorsO)
        
    }else{errorsO.imagen = "Formato de imagen no valida Permitido '.jpeg .png .jpg'"}   */
    

    //validation descripcion
    if(inputs.descripcion === '')
    {errors.descripcion = 'Añade descripcion';}

     //validation pais
     if(inputs.pais === '')
     {errors.pais = 'Selecciona Pais';}

    //validation precio
    const regexPrecio = /^\d+(\.\d+)?$/;
    if(!regexPrecio.test(inputs.precio))
    {errors.precio = 'Precio no valido tiene que ser un numero';}
    const num = Number(inputs.precio);
    if(!isNaN(num) && num <= 0)
        {errors.precio = 'Precio no valido tiene que ser mayor a 0';}


    //validation talles

    inputs.talles
    for(let i=0;i<inputs.talles.length;i++)
    {
        if(inputs.talles[i].stock===''||!Number(inputs.talles[i].stock) ||inputs.talles[i].stock<0)
        {errors.talles='Escribi stock mayor a 0'}

        if(inputs.talles[i].talle==='')
        {errors.talles='Escribi talle'}

    }

    //const regexTalle =/^[a-zA-Z0-9]+(, ?[a-zA-Z0-9]+)*$/;
/*     if(!regexTalle.test(inputs.talles))
    {errors.talles = 'Talles no Validos Formato xxxx, xxxx';}  */

        //validation categoria
        if(inputs.categoria === '')
        {errors.categoria = 'Selecciona una o mas categorias';}

return errors;
}