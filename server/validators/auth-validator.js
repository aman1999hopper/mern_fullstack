const {z} = require("zod");

// create an object schema 

const signupSchema = z.object({
    username : z
    .string({required_error: "Name is required"})
    .trim()
    .min(3, {message: "Name must be at least 3 characters long"})
    .max(80, {message: "Name must be at most 80 characters long"}),
    
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid email format"})
    .min(3,{message: "Email must be at most 3 characters long"})
    .max(255,{message: "Email must be at most 255 characters long"}),

    password: z
    .string({required_error: "Password is required"})
    .trim()
    .min(4,{message: "Password must be at least 4 characters long"})
    .max(15,{message: "Password must be at most 15 characters long"}),

    phone: z
    .string({required_error: "Phone number is required"})
    .trim()
    .min(10,{message: "Phone number must be at least 10 digits long"})
    .max(12,{message: "Phone number must be at most 12 digits long"})

})

module.exports = signupSchema;