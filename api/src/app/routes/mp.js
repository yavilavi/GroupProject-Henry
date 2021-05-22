const mercadopago = require('mercadopago');
const server = require('express').Router();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

server.post('/', async (req, res) => {
  const { services, user, orderId } = req.body;

  const items =
    services &&
    services.map((service) => ({
      title: service.name,
      id: service.id,
      quantity: 1,
      //   quantity: Number(service.orderLine.quantity),
      unit_price: service.price,
    }));

  const preference = {
    items,
    payer: {
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
    },
    back_urls: {
      success: `http://localhost:3001/mp?email=${user.email}&orderId=${orderId}`,
    },
    marketplace: 'E-conomy',
  };

  const response = await mercadopago.preferences.create(preference);
  res.json(response);
});

module.exports = server;
