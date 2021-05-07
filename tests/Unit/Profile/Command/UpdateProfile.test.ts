import { UpdateProfile } from 'Core/Application/Profile/Command/UseCase/UpdateProfile';
import { ProfileRequest } from 'Core/Domain/Profile/Model';
import { InMemoryProfileWriteRepository } from 'Infrastructure/Persistence/InMemory/Profile';

import { StubProfileBuilder } from '../../../Stub';

describe('Unit test - Updating the profile in the source', () => {
	let updateProfileRequest: ProfileRequest;
	let profileWriteRepository: InMemoryProfileWriteRepository;
	let updateProfile: UpdateProfile;

	beforeAll(() => {
		updateProfileRequest = {
			uuid: '1',
			name: 'Mon nouveau profil',
			firstName: 'Nouveau prénom',
			lastName: 'Nouveau nom',
			nationality: 'Nouvelle nationalité',
			birthDate: new Date(1992, 4, 20),
			address: 'Nouvelle adresse',
			postalCode: 'Nouveau code postal',
			city: 'Nouvelle ville',
			country: 'Nouveau pays',
			email: 'email@email.com',
		};
	});

	beforeEach(() => {
		profileWriteRepository = new InMemoryProfileWriteRepository();
		updateProfile = new UpdateProfile(profileWriteRepository);
	});

	it('When the request is invalid', async (done) => {
		expect.assertions(1);
		await expect(updateProfile.execute({} as ProfileRequest)).rejects.toThrowError(`No data is entered.`);
		done();
	});

	it("When the profile doesn't exist", async (done) => {
		expect.assertions(1);
		await expect(updateProfile.execute(updateProfileRequest)).rejects.toThrowError(
			`The profile « ${updateProfileRequest.name} » doesn't exist.`,
		);
		done();
	});

	it('When the profile exists', async (done) => {
		const profile = new StubProfileBuilder().build();
		profileWriteRepository.feedTheProfilesWith([profile]);

		await expect(updateProfile.execute(updateProfileRequest)).resolves.not.toThrowError();

		const profileUpdated = await profileWriteRepository.retrieveProfileById(updateProfileRequest.uuid as string);

		expect(profileUpdated).not.toBeNull();
		expect(profileUpdated.name).toEqual(updateProfileRequest.name);

		done();
	});
});
