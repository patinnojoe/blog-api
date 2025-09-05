const {User} = require('../models')


const Signup = async(req, res, next) =>{
try {
    const {name,role, password,email} = req.body;
    const newUser = new User({
        name,
        role,
        password,
        email

    })

    await newUser.save();

    res.status(201).json({
        message: 'user created successfully',
        data: newUser,
        code: 201,
        status: true
    })
    
} catch (error) {
    next(error)
    
}
}


module.exports ={
    Signup
}