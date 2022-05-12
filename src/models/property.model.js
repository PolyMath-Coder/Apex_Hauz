const db = require('../config/db.config');

class Property {
  constructor(id, status, price, state, city, address, type, image_url) {
    this.id = id;
    this.status = status;
    this.price = price;
    this.state = state;
    this.city = city;
    this.address = address;
    this.type = type;
    this.image_url = image_url;
  }
  static createProperty(newProperty, result) {
    db.query(
      `INSERT INTO property VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newProperty.id,
        newProperty.status,
        newProperty.price,
        newProperty.state,
        newProperty.city,
        newProperty.address,
        newProperty.type,
        newProperty.image_url,
      ],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
        }
        console.log('Created User:', { ...newProperty });
        result(null, { id: res.insertId, ...newProperty });
      }
    );
  }
  static findPropertyById(id, result) {
    db.query(
      `SELECT * FROM property WHERE property_id = ?`,
      [id],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log('found user:', res[0]);
          result(null, res[0]);
          return;
        }
        //not found...
        result({ kind: 'not_found' }, null);
      }
    );
  }
  static getAll(result) {
    db.query('SELECT * FROM property', (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      console.log('Properties: ', res);
      result(null, res);
    });
  }
  static updateById(id, updatedProperty, result) {
    db.query(
      `UPDATE property SET property_id = ?, status = ?, price = ?, state = ?, city = ?, address = ?, type = ?, image_url = ?  WHERE property_id = ?`,
      [
        updatedProperty.id,
        updatedProperty.status,
        updatedProperty.price,
        updatedProperty.state,
        updatedProperty.city,
        updatedProperty.address,
        updatedProperty.type,
        updatedProperty.image_url,
        id,
      ],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
        if (res.affectedRows === 0) {
          result({ kind: 'not_found' }, null);
          return;
        }
        console.log('updated property:', { ...updatedProperty });
        result(null, { ...updatedProperty });
      }
    );
  }
  static delete(id, result) {
    db.query('DELETE FROM property WHERE property_id = ? ', id, (err, res) => {
      if (res.affectedRows === 0) {
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('deleted property with the id', id);
      result(null, res);
    });
  }
}

module.exports = Property;
