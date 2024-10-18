const {
  authRegisterSchema,
  authLoginSchema,
} = require("../zod-schema/validations");

// ! YOU CAN STRIP THE DATA OF UNWANTED PROPERTIES BY USING THE CODE BELOW
// ! SO YOU HAVE A CLEAN VALIDATED DATA
// ! const parsedData = marketItemSchema.parse(data, { strip: true });

exports.validateAuthRegister = (req, res, next) => {
  try {
    // Validate the request body against the Zod schema
    authRegisterSchema.parse(req.body);
    // If validation is successful, proceed to the next middleware/controller
    next();
  } catch (error) {
    // If validation fails, return the errors
    return res.status(400).json({ error: error.errors.map((e) => e.message) });
  }
};

exports.validateAuthLogin = (req, res, next) => {
  try {
    // Validate the request body against the Zod schema
    authLoginSchema.parse(req.body);
    // If validation is successful, proceed to the next middleware/controller
    next();
  } catch (error) {
    // If validation fails, return the errors
    return res.status(400).json({ error: error.errors.map((e) => e.message) });
  }
};
