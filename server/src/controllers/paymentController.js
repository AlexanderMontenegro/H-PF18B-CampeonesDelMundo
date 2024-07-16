const { MercadoPagoConfig, Preference } = require('mercadopago');

const createPreference = async (req, res) => {
  //const { items } = req.body;

  //console.log("creando referencia:", items);

  const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
  const preference = new Preference(client);
  console.log("aca estoy");
  try {
    const response = await preference.create({
      body: {
      
        items: [
          {
            title: req.body.title,
            quantity: req.body.quantity,
            unit_price: req.body.unit_price
          }
        ],
      }
    })
    console.log("Preference created successfully:", response.items);
    //console.log("Preference created successfully2:", (response));

    res.status(200).send(response.items);
  } catch (error) {
    console.error("Error creating preference:", error.message);
    console.error("Error creating preference:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPreference,
};

/*
import { MercadoPagoConfig, Preference } from 'mercadopago';

        const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

        const preference = new Preference(client);

        preference.create({
          body: {
            false,
            items: [
              {
                title: 'My product',
                quantity: 1,
                unit_price: 2000
              }
            ],
          }
        })
        .then(console.log)
        .catch(console.log);
        */