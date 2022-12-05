
const {findUserbyEmail} = require('../users/users.controllers');
const {comparePassword} = require('../utils/crypto');

const checkUserCredintials = async (email,password)=>{
    try{
        const user = await findUserbyEmail(email)
        const verifyPassword = comparePassword(password, user.password)
         if(verifyPassword){
            return user
         }
         return null;
    }catch(error){
        return null;
    }
}

module.exports = checkUserCredintials;