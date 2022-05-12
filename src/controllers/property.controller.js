const Property = require('../models/property.model');

const registerProperty = (req, res) => {
  if (!req.body) {
    res.status(400).json({ msg: 'Input cannot be empty' });
  }
  const { id, status, price, state, city, address, type, image_url } = req.body;
  const property = new Property(
    id,
    status,
    price,
    state,
    city,
    address,
    type,
    image_url
  );
  Property.createProperty(property, (err, data) => {
    if (err) {
      res.status(200).send({
        message: 'Oops! There has been an error!',
      });
    }
    res.status(200).json(data);
  });
};

const findAllProperty = (req, res) => {
  Property.getAll((err, data) => {
    if (err) {
      res.status(500).json({ message: err.message || 'An error occurred...' });
    }
    res.status(200).json({ msg: data });
  });
};

const findOneProperty = (req, res) => {
  const { id } = req.params;
  Property.findPropertyById(Number(id), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(400).send({ err: `Oops! User with id ${id} not found...` });
      }
      res
        .status(400)
        .json({ err: `Error retrieving Property with the id ${id}` });
    }
    res.status(200).json({ msg: data });
  });
};

const updateProperty = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      msg: 'Content cannot be empty!',
    });
  }
  // const { id } = req.params;
  const { id, status, price, state, city, address, type, image_url } = req.body;

  const updatedProperty = new Property(
    req.params.id,
    status,
    price,
    state,
    city,
    address,
    type,
    image_url
  );
  Property.updateById(Number(req.params.id), updatedProperty, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).json({
          msg: `Property with the id ${req.params.id} not found.`,
        });
      } else {
        res
          .status(500)
          .json({ msg: `Error updating user with the id ${req.params.id}` });
      }
    }
    res.status(200).json(data);
  });
};
const deleteProperty = (req, res) => {
  const { id } = req.params;
  Property.delete(id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res
          .status(200)
          .send({ msg: `Property with the id: ${id} is not found.` });
      }
    }
    res.status(500).json({ msg: `Property now deleted...` });
  });
};

module.exports = {
  registerProperty,
  findAllProperty,
  findOneProperty,
  updateProperty,
  deleteProperty,
};
