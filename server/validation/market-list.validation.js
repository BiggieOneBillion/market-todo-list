const {
  marketListSchema,
  marketItemSchema,
} = require("../zod-schema/validations");

const validateMarketList = (req, res, next) => {
  try {
    marketListSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

const validateMarketListItem = (req, res, next) => {
  console.log(req.body);
  
  try {
    marketItemSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = { validateMarketList,validateMarketListItem };
