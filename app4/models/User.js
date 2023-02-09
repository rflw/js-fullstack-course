import validator from 'validator';
import { db } from '../app.js';

export default class User {
  constructor(data) {
    if (!Object.keys(data).length) {
      throw new Error('No user data');
    }

    this.data = this.sanitize(data);
    this.errors = [];
  }

  register() {
    this.validate();
    this.addUser();
  }

  sanitize(data) {
    const isString = value => typeof(value) !== 'string';
    const userDataEntries = Object.entries(data).map(([key, value]) => {
      return [key, isString(value) ? '' : value];
    });

    const userData = Object.fromEntries(userDataEntries);

    return {
      name: userData.name.trim().toLowerCase(),
      email: userData.email.toLowerCase(),
      password: userData.password
    }
  }

  validate() {
    if (this.data.name === '') {
      this.errors.push('Missing user name');
    }

    if (!validator.isAlphanumeric(this.data.name)) {
      this.errors.push('User is not alpha numeric');
    }

    if (!validator.isEmail(this.data.email)) {
      this.errors.push('Incorrect email');
    }

    if (this.data.password === '') {
      this.errors.push('Missing password');
    }

    if (this.data.password > 0 && this.data.password < 12) {
      this.errors.push('Password: min length 12 characters')
    }
  }

  addUser() {
    console.log('User.addUser()')
    if (!this.errors.length) {
      // TODO: encrypt password
      db.collection('users').insertOne(this.data);
    }
  }
}
