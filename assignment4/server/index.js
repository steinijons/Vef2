const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const cors = require('cors');
const pizzaService = require('./services/pizzaService');
const Order = require('./models/Order');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

app.use(bodyParser.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

const PORT = 3500;
let orders = {};

const checkExistence = (elems, res) => {
    return elems.length > 0 ? res.json(elems[0]) : res.status(404).send('Not found');
};

router.get('/pizzas', (req, res) => {
    const pizzas = pizzaService.getMenuItems();
    return res.json(pizzas);
});

router.get('/pizzas/:pizzaId', (req, res) => {
    const { pizzaId } = req.params;
    const pizza = pizzaService.getMenuItems(m => m.id == pizzaId);
    return checkExistence(pizza, res);
});

router.get('/offers', (req, res) => {
    const offers = pizzaService.getOffers();
    return res.json(offers);
});

router.get('/offers/:offerId', (req, res) => {
    const { offerId } = req.params;
    const offer = pizzaService.getOffers(o => o.id == offerId);
    return checkExistence(offer, res);
});

router.get('/orders/:telephone', (req, res) => {
    const { telephone } = req.params;
    return orders.hasOwnProperty(telephone) ? res.json(orders[telephone]) : res.status(404).send(`No orders are found for ${telephone}`);
});

router.post('/orders/:telephone', (req, res) => {
    const { telephone } = req.params;
    const order = new Order(req.body);
    orders.hasOwnProperty(telephone) ? orders[telephone].push(order) : orders[telephone] = [order];
    return res.send(`Order for ${telephone} was successfully issued!`);
});

app.use('/api', router);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
