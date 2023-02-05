import express from 'express';

const router = express.Router()

router.get('/', (req, res) => {
  // renders a view and sends the rendered HTML string to the client
  res.render('home-guest');
});

export default router;
