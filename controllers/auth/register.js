const { User } = require('../../models');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const avatarURL = gravatar.url(email);

  const newUser = new User({ name, email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        name,
        avatarURL,
      },
    },
  });
};

module.exports = register;
