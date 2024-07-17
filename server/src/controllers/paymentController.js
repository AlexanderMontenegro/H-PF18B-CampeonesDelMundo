const { MercadoPagoConfig, Preference } = require('mercadopago');

// Configura el cliente de MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

// Crea una preferencia
const createPreference = async (req, res) => {
  const preference = new Preference(client);

  try {
    const response = await preference.create({
      body: {

        items: [
          {
            title: 'My product',
            quantity: 1,
            unit_price: 2000
          }
        ],
        back_urls: {
          success: 'http://www.tu-sitio.com/success',
          failure: 'http://www.tu-sitio.com/failure',
          pending: 'http://www.tu-sitio.com/pending',
        },
        notification_url: 'http://www.tu-sitio.com/notifications',

      }
    });


    console.log("Preference created successfully:", response);
    res.status(200).send(response); // Enviar la respuesta completa
  } catch (error) {
    console.error("Error creating preference:", error.message);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPreference,
};