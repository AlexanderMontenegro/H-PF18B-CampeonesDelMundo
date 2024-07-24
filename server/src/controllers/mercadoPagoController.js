const { MercadoPagoConfig, Preference } = require('mercadopago');

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

app.post('/create-preference', async (req, res) => {
    const { items } = req.body;
  
    let preference = {
      items: items,
      back_urls: {
        success: 'https://www.success.com',
        failure: 'https://www.failure.com',
        pending: 'https://www.pending.com'
      },
      auto_return: 'approved',
    };
  
    try {
      const response = await mercadopago.preferences.create(preference);
      res.status(200).send({
        id: response.body.id,
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  });