import validator from 'validator';
import { db } from '../app.js';
import bcrypt from 'bcryptjs';

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

    if (!password) {
      console.log('Missing password in db');
    }

    return this.isPasswordMatches(this.data.password, password);
  }

  isPasswordMatches(currentPassword, savedPassword) {
    if (!currentPassword) {
      return false;
    }

    return bcrypt.compareSync(currentPassword, savedPassword);
  }

  sanitize(data) {
    const isString = value => typeof(value) === 'string';
    const rules = {
      name: (value) => value.trim().toLowerCase(),
      email: (value) => value.trim().toLowerCase(),
    };

    const userDataEntries = Object.entries(data).map(([key, value]) => {
      let sanitizedValue = rules[key] ? rules[key](value) : value;
      return [key, isString(sanitizedValue) ? sanitizedValue : ''];
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

    if (this.data.password.length > 0 && this.data.password.length < 12) {
      this.errors.push('Password: min length 12 characters')
    }

    if (this.data.password.length > 50) {
      this.errors.push('Password: max length 50 characters')
    }
  }

  addUser() {
    console.log('User.addUser()')
    if (this.errors.length) {
      console.log('is error');
      return;
    }

    let data = this.data;
    data.password = this.securePassword(this.data.password);

    // TODO: check insert success or error
    // TODO: check if a user with this name does not already exist in the database
    db.collection('users').insertOne(this.data);
  }

  securePassword(password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
