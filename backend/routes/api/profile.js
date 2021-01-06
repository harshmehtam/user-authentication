const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const normalize = require('normalize-url');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(400).json({ msg: 'There is no user data' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const profileFields = {};
    if (req.body.email)
        profileFields['email'] = req.body.email

    if (req.body.firstName)
        profileFields['firstName'] = req.body.firstName

    if (req.body.lastName)
        profileFields['lastName'] = req.body.lastName
    
    try {
        let user = await User.findOneAndUpdate(
            { _id: req.body.id },
            { $set: profileFields },
            { new: true }
        );

        res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

// router.get('/user/:user_id', async (req, res) => {
//     try {
//         const profile = await Profile.findOne({
//             user: req.params.user_id
//         }).populate('user', ['name']);

//         if (!profile) return res.status(400).json({ msg: 'Profile not found' });

//         res.json(profile);
//     } catch (err) {
//         console.error(err.message);
//         if (err.kind == 'ObjectId') {
//             return res.status(400).json({ msg: 'Profile not found' });
//         }
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;