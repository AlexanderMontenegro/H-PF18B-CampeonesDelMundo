const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'process.env.MERCADOPAGO_ACCESS_TOKEN'});

  //mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);

/*
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
  */

  app.post('/api/payments/create-preference', async (req, res) => {
    try {
      const preference = {
        items: [
          {
            title: req.body.title,
            unit_price: req.body.unit_price,
            quantity: req.body.quantity,
          }
        ],
        back_urls: {
          success: 'https://www.success.com',
          failure: 'https://www.failure.com',
          pending: 'https://www.pending.com'
        },
        auto_return: 'approved',
      };
  
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json(response);
    } catch (error) {
      console.error('Error creating preference:', error);
      res.status(500).json({ error: 'Failed to create preference' });
    }
  });
  
  app.listen(3001, () => {
    console.log('Server listening on port 3001');
  });