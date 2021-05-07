import { CreateProfile } from 'Core/Application/Profile/Command/UseCase/CreateProfile';
import { ProfileRequest } from 'Core/Domain/Profile/Model';
import { InMemoryProfileReadRepository, InMemoryProfileWriteRepository } from 'Infrastructure/Persistence/InMemory/Profile';

import { StubProfileBuilder } from '../../../Stub';

describe('Unit test - Creating the profile in the source', () => {
	let createProfileRequest: ProfileRequest;
	let profileReadRepository: InMemoryProfileReadRepository;
	let profileWriteRepository: InMemoryProfileWriteRepository;
	let createProfile: CreateProfile;

	const requestType = 'CREATING_PROFILE';

	beforeAll(() => {
		createProfileRequest = {
			name: 'Mon profil',
			firstName: 'Samir',
			lastName: 'ZEKRI',
			nationality: 'Français',
			birthDate: new Date(1992, 4, 20),
			address: '1 rue Marcel Paul',
			postalCode: '27140',
			city: 'Gisors',
			country: 'France',
			email: 'szekri6@gmail.com',
		};
	});

	beforeEach(() => {
		profileReadRepository = new InMemoryProfileReadRepository();
		profileWriteRepository = new InMemoryProfileWriteRepository();
		createProfile = new CreateProfile(profileReadRepository, profileWriteRepository);
	});

	it('When the request is invalid', async (done) => {
		expect.assertions(1);
		await expect(createProfile.execute({} as ProfileRequest)).rejects.toThrowError(`${requestType} : No data is entered.`);
		done();
	});

	it("When the profile doesn't exist", async (done) => {
		expect.assertions(1);
		await expect(createProfile.execute(createProfileRequest)).resolves.not.toThrowError();
		done();
	});

	it("When the profile's email already exists", async (done) => {
		expect.assertions(1);

		const profile = new StubProfileBuilder().build();
		profileReadRepository.feedTheProfilesWith([profile]);

		await expect(createProfile.execute(createProfileRequest)).rejects.toThrowError(
			`${requestType} : This email address is already associated to a profile.`,
		);
		done();
	});
});
