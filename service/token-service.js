const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model')
const JWT_ACCESS_SECRET = 'FLdDzH0fvK4S7iVzfen6';
const JWT_REFRESH_SECRET = 'j2SkVXY0eI56f6u2IQer';
class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken, 
            refreshToken
        }
    }
    
    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user:userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user:userId, refreshToken})
        return token;
    }
}

module.exports = new TokenService();