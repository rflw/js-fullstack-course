import User from '../models/User.js';

export function login(req, res) {
  const user = new User(req.body);
  user.login();
}

export function logout() {
  
}

export function register(req, res) {
  console.log('userController', 'register')
  const user = new User(req.body);
  user.register();

  if (user.errors.length) {
    res.send(user.errors.join());
    return;
  }

  res.send('Reqister page');
}

export function home(req, res) {
  console.log('userController', 'home')
  // renders a view and sends the rendered HTML string to the client
  res.render('home-guest');
}

const userController = {
  login,
  logout,
  register,
  home
}

export default userController;
