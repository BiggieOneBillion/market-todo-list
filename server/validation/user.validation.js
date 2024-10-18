const { userUpdateSchema } = require("../zod-schema/validations");




const validateUserUpdate = (req, res, next) => {
  try {
    userUpdateSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors.map((e) => e.message) });
  }
};

module.exports = { validateUserUpdate };
