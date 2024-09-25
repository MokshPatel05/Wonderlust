const User = require("../models/user.js");


module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        nexr(err);
      } else {
        req.flash("success", `${username} was registered successfully`);
        res.redirect("/listings");
      }
    });
  } catch (e) {
    req.flash("deleted", e.message);
    res.redirect("/signup");
  }
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome Back to wanderlust !");
  if (res.locals.redirectURL) {
    res.redirect(res.locals.redirectURL);
  } else {
    res.redirect("/listings");
  }
};
