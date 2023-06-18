const Animal = require('../models/Animal');

exports.getAll = () => Animal.find().populate('owner');

exports.getLastThree = () =>
    Animal.find().sort({ createdAt: -1 }).limit(3).populate('owner');

exports.getOne = (animalId) => Animal.findById(animalId).populate('owner');

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.edit = (animalId, animalData) =>
    Animal.findByIdAndUpdate(animalId, animalData);

exports.create = (animalData) => Animal.create(animalData);

exports.donate = async (animalId, user) => {
    const animal = await Animal.findById(animalId);

    animal.donations.push(user);

    return animal.save();
};

exports.searchLocation = async (location) => {
    if (location) {
        return Animal.find({ location: location }).lean();
    }
};
