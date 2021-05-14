import Joi from 'joi'

function firstAndLastValidation(firstandlastdata) {
    const schema = Joi.object({
        firstName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        lastName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    })

    return schema.validate(firstandlastdata)
}

export default firstAndLastValidation