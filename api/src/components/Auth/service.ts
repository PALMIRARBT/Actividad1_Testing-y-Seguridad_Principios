
import UserService from '../User/service';
import { IUserModel } from '../User/model';

const AuthService = {
	async createUser(body: any): Promise<IUserModel> {
		// Puedes agregar validaciones adicionales aquí si es necesario
		return UserService.insert(body);
	},

	async getUser(body: any): Promise<IUserModel> {
		// Busca usuario por email y compara contraseña
		const user = await UserService.findByEmail(body.email);
		if (!user) {
			throw new Error('User not found');
		}
		// Si hay campo password, verifica
		if (body.password && user.comparePassword) {
			const match = await user.comparePassword(body.password);
			if (!match) {
				throw new Error('Invalid password');
			}
		}
		return user;
	}
};

export default AuthService;
