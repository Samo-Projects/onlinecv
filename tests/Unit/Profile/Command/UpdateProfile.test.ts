import { UpdateProfile } from 'Core/Application/Profile/Command/UseCase/UpdateProfile';
import { ProfileRequest } from 'Core/Domain/Profile/Model';
import { InMemoryProfileWriteRepository } from 'Infrastructure/Persistence/InMemory/Profile';
import { v4 as uuidv4 } from 'uuid';

import { StubProfileBuilder } from '../../../Stub';

describe('Unit test - Updating the profile in the source', () => {
	let updateProfileRequest: ProfileRequest;
	let profileWriteRepository: InMemoryProfileWriteRepository;
	let updateProfile: UpdateProfile;
	let uuid: string;

	beforeAll(() => {
		uuid = uuidv4();
		updateProfileRequest = {
			uuid,
			name: 'Profil Updated - Samir ZEKRI',
			firstName: 'SSamir',
			lastName: 'ZZEKRI',
			nationality: 'FFrançaise',
			birthDate: new Date(1992, 45, 20),
			address: 'Nouvelle adresse',
			postalCode: '27140',
			city: 'Gisors',
			country: 'France',
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
		const profile = new StubProfileBuilder().withUuid(uuid).build();
		profileWriteRepository.feedTheProfilesWith([profile]);

		await expect(updateProfile.execute(updateProfileRequest)).resolves.not.toThrowError();

		const profileUpdated = await profileWriteRepository.retrieveProfileById(updateProfileRequest.uuid as string);

		expect(profileUpdated).not.toBeNull();
		expect(profileUpdated.name).toEqual(updateProfileRequest.name);

		done();
	});
});
