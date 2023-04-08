const User = require('../modules/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// index
const index = (req, res, next) => {
  User.find()
    .then(response => {
      res.json({
        response
      })
    }).catch(err => {
      res.json({
        message: `can't get all() of users list with error ${err}`
      })
    })
}
// register
const register = async (req, res, next) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      // If the email already exists, send an error message
      return res.json({ message: 'Email already exists' });
    }
    
    // If the email doesn't exist, create a new user
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      companyName: req.body.companyName,
      website: req.body.website,
      password: hashedPass
    });
    await user.save();
    res.json({
      message: 'user has been added successfully!'
    });
  } catch (err) {
    res.json({
      message: 'error with adding user'
    });
  }
};


// login
const login = (req, res, next) => {
  let email = req.body.email
  let password = req.body.password

  User.findOne({ $or: [{ email: email }] }).then(user => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err
          })
        }
        if (result) {
          let token = jwt.sign({ name: user.fName }, 'AzQ,PI)0(', { expiresIn: '1d' })
          res.json({
            message: 'Login Successful!',
            user,
            token: token
          })
        } else {
          res.json({
            message: 'Password not matched!'
          })
        }
      })
    } else {
      res.json({
        message: 'User not found!'
      })
    }
  })
}

const checkUserExistsByEmail = (req, res, next) => {
  const email = req.body.email;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        // User exists, handle accordingly
        // For example, you could return an error message
        res.json({
          message: 'User with this email already exists'
        });
      } else {
        // User does not exist, proceed with registration logic
        next();
      }
    })
    .catch(err => {
      res.json({
        message: `Error checking if user exists: ${err}`
      });
    });
}

const blacklist = new Set();

const logout = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }
  
  // Add token to blacklist
  blacklist.add(token);
  
  return res.json({
    message: 'Logout successful!'
  });
}


const getUserByEmail = (req, res, next) => {
  const email = req.params.email;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json({
          user: user
        });
      } else {
        res.json({
          message: 'User not found'
        });
      }
    })
    .catch(err => {
      res.json({
        message: `Error getting user by email: ${err}`
      });
    });
}

const updateUser = (req, res, next) => {
  const { fName, lName, email, phone, role, companyName,website } = req.body;
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.fName = fName || user.fName;
      user.lName = lName || user.lName;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.role = role || user.role;
      user.companyName = companyName || user.companyName;
      user.website = website || user.website;

      return user.save();
    })
    .then(() => {
      res.json({
        message: 'User has been updated successfully!'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error with updating user',
        error: error.message
      });
    });
};


module.exports = {
  register,
  login,
  index,
  checkUserExistsByEmail,
  getUserByEmail,
  updateUser,
  logout
}