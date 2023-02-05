import User from '../models/User.js';

export function login() {

}

export function logout() {
  
}

export function register(req, res) {
  const user = new User(req.body);

  user.register();

  if (user.errors.length) {
    
    return;
  }

  res.send('Reqister page');
}

export function home(req, res) {
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
