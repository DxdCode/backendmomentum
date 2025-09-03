import User from "../models/User.js";

class userRepository {

    async createUser(userData) {
        return await User.create(userData);
    }
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }
    async findById(id) {
        return await User.findByPk(id);
    }
    async updateUser(id, updateData) {
        const user = await this.findById(id);
        if (!user) throw new Error('User not found');
        return await user.update(updateData);
    }


}
export default new userRepository;