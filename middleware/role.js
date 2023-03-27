const RoleUser = (promissions) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    if (promissions.includes(userRole)) {
      next()
    } else {
      return res.status(401).json('You are not Admin')
    }
  }
}

module.exports = RoleUser