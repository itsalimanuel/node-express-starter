const mongose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./modules/Admin");
const dotenv = require("dotenv");


dotenv.config();
const dbURL = process.env.dbURL;

mongose
  .connect(dbURL)
  .then(async () => {
    const admin = await Admin.findOne({ email: process.env.SEED_ADMIN_EMAIL });
    if (admin) {
      console.log("Admin seeding not required, already exists");
      process.exit();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      process.env.SEED_ADMIN_PASSWORD,
      salt
    );
    const newAdmin = new Admin({
      name: process.env.SEED_ADMIN_NAME,
      email: process.env.SEED_ADMIN_EMAIL,
      password: hashedPassword,
    });
    const result = await newAdmin.save();
    console.log("Admin seeded successfully", result);
    process.exit();
  })
  .catch((err) => {
    console.error("Failed to connect to database...", err.message);
    process.exit(1);
  });
