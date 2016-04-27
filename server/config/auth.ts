import * as jwt from 'jsonwebtoken'
import {getUsers} from '../controllers/users.controller'
import {config} from './config'
import {checkPassword} from '../helpers/commonHelpers';

export function login(req, res) {
    getUsers({username: req.body.username}, true)
        .catch(() => {
            res.status(401).send({
                success: false,
                error: 'Authentication failed. User not found.'
            });
        })
        // Check if the user has a valid password
        .then(user => {
            return {
                username: user[0].username,
                password: user[0].password,
                _id: user[0]._id,
                receivedPass: req.body.password
            }
        })
        .then(user => checkPassword(user))
        // Return error if a bad password was sent
        .catch(() => { res.status(401).send({ success: false, error: 'Wrong username and password combination.' })})
        .then((user) => {
            // create the jwt token and add the username and _id
            let token = jwt.sign({username: user.username, _id: user._id}, config.appSecret, {expiresIn: 2880});
            // return the information including token as JSON
            res.json({
                success: true,
                data: {username: user.username, _id: user._id},
                token: token
            });
        });
}

// Unpack token
export function unpackToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.appSecret, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded)
        })  
    })
}