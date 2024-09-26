import userSchema from '../Models/userSchema';
import UniversalFunction from '../lib/UniversalFunction';

const getAllUsers = async (req: any, res: any) => {
    try {
        const getAllUsers = await userSchema.find({}, { password: 0, accessToken: 0, fcmToken: 0 }).sort({ name: 1 });;
        return UniversalFunction.SendResponse(res, 200, "Success", getAllUsers)
    } catch (error: any) {
        return UniversalFunction.SendServerError(res, error)
    }
}

export default {
    getAllUsers
}