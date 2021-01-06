const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { OAuth2Client } = require('google-auth-library');

const User = require('../../models/User');
const client = new OAuth2Client('897928278253-3db9esu93orctgnevm00op1o4ae5q4cc.apps.googleusercontent.com');

router.post(
    '/',
    async (req, res) => {
        const { tokenId } = req.body;
        client.verifyIdToken({ idToken: tokenId, audience: '897928278253-3db9esu93orctgnevm00op1o4ae5q4cc.apps.googleusercontent.com' })
            .then(reponse => {
                const { name, email, email_verified } = reponse.payload;
                if (email_verified) {
                    try {
                        return User.findOne({ email }).exec(async (err, user) => {
                            if (err) {
                                return res.status(400).json({
                                    error: "Something went wrong..."
                                })
                            } else {
                                if (user) {
                                    const token = jwt.sign(
                                        { _id: user._id },
                                        config.get('jwtSecret'),
                                        { expiresIn: 360000 }
                                    );
                                    const { _id, firstName, email, lastName } = user;
                                    return res.json({
                                        token,
                                        user: { _id, email, firstName, lastName }
                                    })
                                } else {
                                    let password = email;
                                    let newUser = new User({
                                        firstName: name,
                                        lastName: name,
                                        email,
                                        password
                                    });
                                    const salt = await bcrypt.genSalt(10);
                                    newUser.password = await bcrypt.hash(password, salt);
                                    await newUser.save();
                                    const payload = {
                                        user: {
                                            id: newUser.id
                                        }
                                    };
                                    jwt.sign(
                                        payload,
                                        config.get('jwtSecret'),
                                        { expiresIn: 360000 },
                                        (err, token) => {
                                            if (err) throw err;
                                            return res.status(201).json({
                                                token,
                                                success: true,
                                                message: "User created!",
                                                errors: []
                                            });
                                        }
                                    );
                                }
                            }
                        });
                    } catch (err) {
                        console.error(err.message);
                        res.status(500).send('Server error');
                    }
                }
            })
    }
);

module.exports = router;