
const jwt = require('jsonwebtoken');
const saltKey = require('./saltkey');

module.exports = (req, res, next) => {
    console.log('this is a entry point');
    console.log(req.headers.authorization);
    // angular에서 접근하건간에 front-end에서 접근하는 모든 httpReqesut
    // 는 반드시 authorization + 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvbnloYTFAZ21haWwuY29tIiwidXNlcklkIjoiNWFlMWE2MDQ4OTBjN2NjN2Y3MzE0ZmJiIiwiaWF0IjoxNTI0NzM5MDY1LCJleHAiOjE1MjQ3NDI2NjV9.3LdUX4GbILY5IGx_HQ8N8Sa2zWIN_f5XN-kkl_if_Es'으로 접근하므로 반드시 분해를 해야함 
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, saltKey);
        console.log("this is a decoded point", decoded);
        req.userData = decoded;
        next();
    } catch(error) {
        console.log('this is a failed points');
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
