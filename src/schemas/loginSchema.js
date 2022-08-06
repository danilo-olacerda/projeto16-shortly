import joi from "joi";

const user = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default user;