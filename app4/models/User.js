export default class User {
  constructor(data) {
    if (!Object.keys(data).length) {
      throw new Error('No user data');
    }

    this.data = data;
    this.errors = [];
  }

  register() {
    this.validate();
  }

  validate() {
    if (this.data.username === '') {
      this.errors.push('Missing user name');
    }

    if (this.data.useremail === '') {
      this.errors.push('Missing email');
    }

    if (this.data.userpassword === '') {
      this.errors.push('Missing password');
    }

    if (this.data.userpassword > 0 && this.data.userpassword < 12) {
      this.errors.push('Password: min length 12 characters')
    }
  }
}
