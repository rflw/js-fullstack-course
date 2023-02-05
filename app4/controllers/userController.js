export function login() {

}

export function logout() {
  
}

export function register(req, res) {
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
