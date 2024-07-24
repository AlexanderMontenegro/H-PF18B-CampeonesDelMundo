const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

// Controlador para crear una preferencia
const createPreference = async (req, res) => {
  console.log('Request received at /create-preference');
  const { items } = req.body;
  console.log('Request body:', req.body);

  const preference = new Preference(client);

  try {
    const response = await preference.create({
      body: {
        items: items.map(item => ({
          id: item.id,
          category_id: item.tipo,
          description: item.descripcion,
          title: item.title,
          quantity: item.quantity,
          unit_price: Number(item.precio)
        }
      
        )),
        back_urls: {
          success: 'https://www.success.com',
          failure: 'https://www.failure.com',
          pending: 'https://www.pending.com'
        },
        auto_return: 'approved',
      }
    });

    console.log('Mercado Pago response:', response.id);
    
    res.status(200).send( response.id );
  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).send({
      error: error.message,
      stack: error.stack
    });
  }
};

module.exports = { createPreference};
