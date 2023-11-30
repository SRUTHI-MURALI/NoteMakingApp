import userSchema from '../Model/userModel.js'

const registerUser = async (req, res) => {
    try {
      const newuser = await userSchema.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
  
      if (newuser) {
        res.status(201).json({
          _id: newuser._id,
          name: newuser.name,
          email: newuser.email,
        });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  };


  const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await userSchema.findOne({ email });
  
      if (user) {
        if (user.password === password) {
          res.status(201).json({ user });
        } else {
          res.status(401).json({ error: "Invalid password" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  export {registerUser,userLogin}