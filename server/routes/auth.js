import passport from 'passport';
import User from '../model/user.js'


export const signupRoute = async (req,res) => {
  try{
let {username,email,password} = req.body;
let newUser = new User({
    username: username,
    email:email,
});
let registeredUser = await User.register(newUser,password);
console.log(registeredUser);

req.login(registeredUser, (err) => {
            if (err) {
                console.error("Signup error:", err);
                return res.json({ success: false, message: "user already exist" });
            }

            return res.json({ success: true, message: "Signup and login successful" });
        });
      } catch(err){
        console.log(err);
        res.json({success: false, message: err.message})
      }

}

export const loginRoute = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Server error", error: err });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: info.message || "Invalid credentials" });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Login failed", error: err });
      }

      return res.status(200).json({ success: true, message: "Login successful" });
    });
  })(req, res, next);
}

export const authcheckRoute = (req,res) => {
if(!req.isAuthenticated()){
    res.json({success: false, message: "Please sign up or login to get started"});
} else {
    res.json({ success: true, user: req.user});
    console.log(req.user);
}
}

export const logoutRoute = (req,res,next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        res.json({success: true, message: "logged out successfully"});
    });
}

