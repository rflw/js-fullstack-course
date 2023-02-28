import User from '../models/User.js';

export async function login(req, res) {
  const user = new User(req.body);
  const isLoggedIn = await user.login();
  const message = isLoggedIn ? "User logged in" : 'Invalid username or password';
  req.session.user = { favColor: 'blue', userName: user.data.name };

  res.send(message);
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
  console.log( 'session', req.session.user );
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
