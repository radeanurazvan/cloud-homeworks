const categories = {
    bike: 1,
    car: 2,
    drone: 3,
    other: 99
};

module.exports = {
    ...categories,
    all: [categories.bike, categories.car, categories.drone, categories.other]
};