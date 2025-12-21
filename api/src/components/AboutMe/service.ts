
import AboutMeModel, { IAboutMeModel } from './model';

const AboutMeService = {
	async findAll(): Promise<IAboutMeModel[]> {
		return AboutMeModel.find({});
	},
	async findOne(id: string): Promise<IAboutMeModel | null> {
		return AboutMeModel.findById(id);
	},
		async insert(body: Partial<IAboutMeModel>): Promise<any> {
			return AboutMeModel.create(body);
		},
	async remove(id: string): Promise<IAboutMeModel | null> {
		return AboutMeModel.findByIdAndDelete(id);
	}
};

export default AboutMeService;
