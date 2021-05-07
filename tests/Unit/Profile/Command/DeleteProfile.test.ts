import { DeleteProfile } from 'Core/Application/Profile/Command/UseCase/DeleteProfile';
import { ProfileIdentifierRequest } from 'Core/Domain/Profile/Model';
import { InMemoryProfileWriteRepository } from 'Infrastructure/Persistence/InMemory/Profile';
import { v4 as uuidv4 } from 'uuid';

import { StubProfileBuilder } from '../../../Stub';

describe('Unit test - Deleting the profile in the source', () => {
	let deleteProfileRequest: ProfileIdentifierRequest;
	let profileWriteRepository: InMemoryProfileWriteRepository;
	let deleteProfile: DeleteProfile;
	let uuid: string;

	beforeAll(() => {
		uuid = uuidv4();
		deleteProfileRequest = { uuid };
	});

	beforeEach(() => {
		profileWriteRepository = new InMemoryProfileWriteRepository();
		deleteProfile = new DeleteProfile(profileWriteRepository);
	});

	it('When the request is invalid', async (done) => {
		expect.assertions(1);
		await expect(deleteProfile.execute({} as ProfileIdentifierRequest)).rejects.toThrowError(`No data is entered.`);
		done();
	});

	it("When the profile doesn't exist", async (done) => {
		expect.assertions(1);
		await expect(deleteProfile.execute(deleteProfileRequest)).rejects.toThrowError(
			`The profile « ${deleteProfileRequest.uuid} » doesn't exist.`,
		);
		done();
	});

	it('When the profile exists', async (done) => {
		const profile = new StubProfileBuilder().withUuid(uuid).build();
		profileWriteRepository.feedTheProfilesWith([profile]);

		await expect(deleteProfile.execute(deleteProfileRequest)).resolves.not.toThrowError();
		done();
	});
});
