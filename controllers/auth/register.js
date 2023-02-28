const { User } = require('../../models');
const { Conflict } = require('http-errors');

const register = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const newUser = new User({ name, email, subscription });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        name,
        subscription,
      },
    },
  });
};

module.exports = register;
