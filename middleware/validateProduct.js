const { body, validationResult } = require("express-validator");
const logger = require('./logger'); // Import your Winston logger

const productValidationRules = [
    body('name')
        .notEmpty()
        .withMessage('Product name is required')
        .isString()
        .withMessage('Product name must be a string'),
    body('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Product price must be a number'),
    body('quantity')
        .notEmpty()
        .isNumeric({min: 0})
        .withMessage('Product quantity must be a number if provided'),
]

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Log it explicitly to error.log
    logger.error(`Validation Error on ${req.method} ${req.originalUrl}: ${JSON.stringify(errors.array())}`);

        return res.status(400).json({ errors: errors.array().map(err => ({ field: err.param, message: err.msg })) });
    }
    next();
}

module.exports = {
    productValidationRules,
    validate
};







