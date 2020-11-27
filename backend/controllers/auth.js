const User = require("../models/user");

//create and update user
exports.userCreateOrUpdate = async (req, res) => {
  const { name, email, picture } = req.user;

  console.log(name);

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    // console.log("User updated", user);
    res.json(user);
  } else {
    const newUser = await new User({
      name: email.split("@")[0],
      email,
      picture,
    }).save();
    // console.log("user created", newUser);
    res.json(newUser);
  }
};

//get current user
exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
