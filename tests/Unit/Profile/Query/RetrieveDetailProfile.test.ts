import { RetrieveDetailProfile } from 'Core/Application/Profile/Query/UseCase/RetrieveDetailProfile';
import { InMemoryProfileReadRepository } from 'Infrastructure/Persistence/InMemory/Profile';
import { v4 as uuidv4 } from 'uuid';

import { StubProfileBuilder } from '../../../Stub';

describe('Unit test - Retrieving the profile details in the source', () => {
	it('A details of one profile', async (done) => {
		const uuid = uuidv4();
		const profile = new StubProfileBuilder().withUuid(uuid).build();
		const profileReadRepository = new InMemoryProfileReadRepository();
		profileReadRepository.feedTheProfilesWith([profile]);

		const retrieveDetailProfile = new RetrieveDetailProfile(profileReadRepository);
		const profileExpected = await retrieveDetailProfile.execute({ uuid });
		const profileExpectedResult = profileExpected.getResult();

		expect(profile.name).toEqual(profileExpectedResult.name);
		expect(profile.firstName).toEqual(profileExpectedResult.firstName);
		expect(profile.lastName).toEqual(profileExpectedResult.lastName);
		expect(profile.birthDate).toEqual(profileExpectedResult.birthDate);
		expect(profile.address).toEqual(profileExpectedResult.address);
		expect(profile.postalCode).toEqual(profileExpectedResult.postalCode);
		expect(profile.city).toEqual(profileExpectedResult.city);
		expect(profile.email).toEqual(profileExpectedResult.email);

		done();
	});
});
