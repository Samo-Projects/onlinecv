import { RetrieveDetailProfile } from 'Core/Application/Profile/Query/UseCase/RetrieveDetailProfile';
import { ProfileIdentifierRequest } from 'Core/Domain/Profile/Model';
import { InMemoryProfileReadRepository } from 'Infrastructure/Persistence/InMemory/Profile';
import { v4 as uuidv4 } from 'uuid';

import { StubProfileBuilder } from '../../../Stub';

describe('Unit test - Retrieving the profile details in the source', () => {
	let profileReadRepository: InMemoryProfileReadRepository;
	let retrieveDetailProfile: RetrieveDetailProfile;

	const requestType = 'RETRIEVING_PROFILE';

	beforeEach(() => {
		profileReadRepository = new InMemoryProfileReadRepository();
		retrieveDetailProfile = new RetrieveDetailProfile(profileReadRepository);
	});

	it('When the request is invalid', async (done) => {
		expect.assertions(1);
		await expect(retrieveDetailProfile.execute({} as ProfileIdentifierRequest)).rejects.toThrowError(
			`${requestType} : No data is entered.`,
		);
		done();
	});

	it('A details of one profile', async (done) => {
		const uuid = uuidv4();
		const profile = new StubProfileBuilder().withUuid(uuid).build();
		profileReadRepository.feedTheProfilesWith([profile]);

		const profileExpected = await retrieveDetailProfile.execute({ uuid });
		const profileExpectedResult = profileExpected.getResult();

		expect(profile.name).toEqual(profileExpectedResult.name);
		expect(profile.firstName).toEqual(profileExpectedResult.firstName);
		expect(profile.lastName).toEqual(profileExpectedResult.lastName);
		expect(profile.nationality).toEqual(profileExpectedResult.nationality);
		expect(profile.birthDate).toEqual(profileExpectedResult.birthDate);
		expect(profile.address).toEqual(profileExpectedResult.address);
		expect(profile.postalCode).toEqual(profileExpectedResult.postalCode);
		expect(profile.city).toEqual(profileExpectedResult.city);
		expect(profile.country).toEqual(profileExpectedResult.country);
		expect(profile.email).toEqual(profileExpectedResult.email);
		expect(profile.profession).toEqual(profileExpectedResult.profession);
		expect(profile.link).toEqual(profileExpectedResult.link);
		expect(profile.photo).toEqual(profileExpectedResult.photo);
		expect(profile.isRoundPhoto).toEqual(profileExpectedResult.isRoundPhoto);
		done();
	});
});
