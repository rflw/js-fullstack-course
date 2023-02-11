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

  async login() {
    console.log('login');
    const query = { name: this.data.name };

    const { password } = await db.collection('users').findOne(query);

    if (password !== this.data.password) {
      console.log('Invalid username or password');
      return false;
    }

    console.log('Valid user');
    return true;
  }

  sanitize(data) {
    const isString = value => typeof(value) !== 'string';
    const rules = {
      name: (value) => value.trim().toLowerCase(),
      email: (value) => value.trim().toLowerCase(),
    };

    const userDataEntries = Object.entries(data).map(([key, value]) => {
      let sanitizedValue = rules[key] ? rules[key](value) : value;
      return [key, isString(sanitizedValue) ? '' : sanitizedValue];
    });

    const userData = Object.fromEntries(userDataEntries);

    // TODO: return only incoming data
    // email is not passed on /login
    return {
      name: userData.name,
      email: userData.email,
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
      // TODO: check insert success or error
      db.collection('users').insertOne(this.data);
    }
  }
}
