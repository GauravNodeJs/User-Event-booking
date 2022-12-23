import jwt from 'jsonwebtoken'

class Authentication {
    tokenMiddleware(parent, args, context) {
        let token = context.token
        try {
            const decoded = jwt.verify(token, "newkey")
            context.user = decoded
        }
        catch (err) {
            return new Error("user not authenticated")  
        }
    }
}
export default new Authentication