import joi from "joi";

const newUser = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
});

export default newUser;