const Property = require('../models/property.model');
const cloudinary = require('../utils/cloudinary');
const multer = require('../utils/multer');
// const path = require('path');

const registerProperty = async (req, res) => {
  const { id, status, price, state, city, address, type, image_url } = req.body;
  //const result = await cloudinary.uploader.upload(req.file.path);
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
    res.status(200).json({ status: 'success', data });
  });
};

const uploadPropertyImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
};

const findAllProperty = (req, res) => {
  Property.getAll((err, data) => {
    if (err) {
      res.status(500).json({ message: err.message || 'An error occurred...' });
    }
    res.status(200).json({ status: 'sucess', data });
  });
};

const getPropertyType = (req, res) => {
  const type = req.query;
  Property.getPropertyType(type, (err, data) => {
    if (err) {
      res.status(400).json({ error: err });
    }
    res.status(200).json({ status: 'success', data });
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
    res.status(200).json({ status: 'success', data });
  });
};

const updateProperty = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      msg: 'Content cannot be empty!',
    });
  }
  // const { id } = req.params;
  const { id, status, price, type, image_url } = req.body;

  const updatedProperty = new Property(
    req.params.id,
    status,
    price,
    type,
    image_url
  );
  Property.updateById(Number(req.params.id), req.body, (err, data) => {
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
    res.status(200).json({ status: 'success', data });
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
    res.status(500).json({ status: 'sucess', data });
  });
};

module.exports = {
  registerProperty,
  getPropertyType,
  findAllProperty,
  findOneProperty,
  updateProperty,
  deleteProperty,
  uploadPropertyImage,
};
