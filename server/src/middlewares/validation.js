//  para usar validaciones es neceseario instalar  
//*  express-validator

/*
 * notEmpty(): Verifica que el campo no esté vacío.
 * withMessage('El tipo es obligatorio'): Mensaje de error personalizado si la validación falla.
 * isFloat({ gt: 0 }): Verifica que el campo sea un número flotante mayor que 0
 * isURL(): Verifica que el campo sea una URL válida.
 */
const{ body, validationResult } = require('express-validator'); 

const validateProduct = [
  body('tipo').notEmpty().withMessage('El tipo es obligatorio'),
  body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
  body('precio').isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo'),
  body('imagen').isURL().withMessage('La imagen debe ser una URL válida'),
  body('marca').notEmpty().withMessage('La marca es obligatoria'),
  body('pais').notEmpty().withMessage('El país es obligatorio'),
  body('talles').notEmpty().withMessage('Los talles son obligatorios'),
  body('categoria').notEmpty().withMessage('La categoría es obligatoria'),
  body('stock').notEmpty().withMessage('El campo stock es obligatorio').isInt({ gt: 0 }).withMessage('El stock debe ser un número entero mayor que 0'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {   // validacion de errores
      return res.status(400).json({ errors: errors.array() });
    }
    next();  // itera en las distintas validaciones.
  }
];

module.exports = {
  validateProduct,
};
