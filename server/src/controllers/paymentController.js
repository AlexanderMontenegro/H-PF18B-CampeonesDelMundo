
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