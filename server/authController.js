import User from './User.js';
import Role from './Role.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { secret } from './config.js';

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Error in registration", errors });
            }
            const { username, password } = req.body;

            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({ message: "User with this username already exists" });
            }

            const hashPassword = bcrypt.hashSync(password, 7);

            let userRole = await Role.findOne({ value: "USER" });
            if (!userRole) {
                userRole = new Role({ value: "USER" });
                await userRole.save();  
            }

            const user = new User({ username, password: hashPassword, roles: [userRole._id] });  
            await user.save();

            return res.json({ message: "User registered successfully" });

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Registration error" });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Password is not correct" });
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({ token });

        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Login error" });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find().populate('roles');  // Use populate to get role details
            res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error fetching users" });
        }
    }
}

export default new authController();
