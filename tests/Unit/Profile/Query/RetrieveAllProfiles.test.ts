import { RetrieveAllProfiles } from 'Core/Application/Profile/Query/UseCase/RetrieveAllProfiles';
import { Profile } from 'Core/Domain/Profile';
import { InMemoryProfileReadRepository } from 'Infrastructure/Persistence/InMemory/Profile';
import { v4 as uuidv4 } from 'uuid';

import { StubProfileBuilder } from '../../../Stub';

describe('Unit test - Retrieving all profiles in the source', () => {
	let profileReadRepository: InMemoryProfileReadRepository;
	let retrieveAllProfiles: RetrieveAllProfiles;
	let profile1: Profile;
	let uuid1: string;
	let uuid2: string;

	beforeAll(() => {
		uuid1 = uuidv4();
		uuid2 = uuidv4();
	});

	beforeEach(() => {
		profileReadRepository = new InMemoryProfileReadRepository();
		retrieveAllProfiles = new RetrieveAllProfiles(profileReadRepository);
		profile1 = new StubProfileBuilder().withUuid(uuid1).build();
	});

	it('When there is no profile in the source', async (done) => {
		const profiles = await retrieveAllProfiles.execute();
		expect(profiles.getResult()).toEqual([]);
		done();
	});

	it('When there is one profil in the source', async (done) => {
		profileReadRepository.feedTheProfilesWith([profile1]);

		const profiles = await retrieveAllProfiles.execute();
		expect(profiles.getResult()).toEqual([profile1]);
		done();
	});

	it('When there are two profiles in the source', async (done) => {
		const profile2 = new StubProfileBuilder().withUuid(uuid2).build();
		profileReadRepository.feedTheProfilesWith([profile1, profile2]);

		const profiles = await retrieveAllProfiles.execute();
		verifyListOfProfiles(profiles.getResult(), [profile1, profile2]);
		done();
	});

	const verifyListOfProfiles = (profiles: Profile[], profilesExpected: Profile[]) => {
		expect(profiles.length).toEqual(profilesExpected.length);
		profilesExpected.forEach((profileExpected, index) => verifyOneProfile(profiles[index], profileExpected));
	};

	const verifyOneProfile = (profile: Profile, profileExpected: Profile) => {
		expect(profile.name).toEqual(profileExpected.name);
		expect(profile.firstName).toEqual(profileExpected.firstName);
		expect(profile.lastName).toEqual(profileExpected.lastName);
		expect(profile.birthDate).toEqual(profileExpected.birthDate);
		expect(profile.address).toEqual(profileExpected.address);
		expect(profile.postalCode).toEqual(profileExpected.postalCode);
		expect(profile.city).toEqual(profileExpected.city);
		expect(profile.email).toEqual(profileExpected.email);
	};
});
