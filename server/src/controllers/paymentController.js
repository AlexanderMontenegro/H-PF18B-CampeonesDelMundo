const { MercadoPagoConfig, Preference } = require('mercadopago');

// Configura el cliente de MercadoPago
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

// Crea una preferencia
const createPreference = async (req, res) => {
  const { items } = req.body; // Recibir los artículos desde la solicitud
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
      
      )
    
    ),
    back_urls: {
      success: 'https://www.success.com',
      failure: 'https://www.failure.com',
      pending: 'https://www.pending.com'
    },
    auto_return: 'approved',  }
    });

    console.log("Preference created successfully:", response);
    res.status(200).send(response.body); // Enviar solo el cuerpo de la respuesta
  } catch (error) {
    console.error("Error creating preference:", error.message);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPreference,
};
