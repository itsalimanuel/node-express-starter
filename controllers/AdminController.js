const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../modules/Admin");

const index = (req, res, next) => {
  Admin.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((err) => {
      res.json({
        message: `can't get admin's because of : ${err}`,
      });
    });
};

const create = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      res.status(401).json({ message: "UnAuthorized" });
    }
    const { name, email, password } = req.body;
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      res.status(400).json({ message: "Admin already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });
    const admin = await newAdmin.save();
    res.status(210).json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res, next) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      res.status(404).json({ message: "Admin Not Found" });
      return;
    }
    if (!(await bcrypt.compare(req.body.password, admin.password))) {
      res.status(401).json({ message: "Incorrect Password" });
      return;
    }
    const token = jwt.sign(
      {
        email: admin.email,
        userId: admin._id.toString(),
      },
      process.env.SECRET_KEY,
      { expiresIn: "1hr" }
    );
    res
      .status(200)
      .json({ token: token, email: admin.email, name: admin.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
      return;
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { index, create, login, getAdmin };
