const resource = require('../resources/pizza.json');
const common = require('./common');

const pizzaService = () => {
    return {
        getMenuItems: (predicate) => common.fetchWithPredicate(predicate, resource, 'menu'),
        getOffers: (predicate) => common.fetchWithPredicate(predicate, resource, 'offers')
    };
};

module.exports = pizzaService();
