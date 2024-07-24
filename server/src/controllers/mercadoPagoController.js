const express = require('express');

const mercadopago = require('mercadopago');


mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);

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
      const response = await mercadopago.Preference.create(preference);
      res.status(200).send({response});
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  });
  

/*
  const preference = await new Preference(client);

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