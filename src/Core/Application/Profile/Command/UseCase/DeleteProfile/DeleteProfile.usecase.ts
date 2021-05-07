import { ProfileInvalidRequest, ProfileNotFound } from 'Core/Application/Profile/Command/Error';
import { ProfileIdentifierRequest } from 'Core/Domain/Profile/Model';
import { ProfileWriteRepository } from 'Core/Domain/Profile/Repository';
import { UseCase, UseCaseResult } from 'SharedKernel/Definition/UseCase';

import { DeleteProfileResponse } from './';

class DeleteProfile implements UseCase<ProfileIdentifierRequest, DeleteProfileResponse> {
	requestType = 'DELETING_PROFILE';

	constructor(private profileWriteRepository: ProfileWriteRepository) {}

	async execute(profileIdentifierRequest: ProfileIdentifierRequest): Promise<DeleteProfileResponse> {
		if (profileIdentifierRequest && Object.keys(profileIdentifierRequest).length === 0 && profileIdentifierRequest.constructor === Object)
			throw UseCaseResult.fail(new ProfileInvalidRequest(this.requestType, `No data is entered.`)).getError();

		const { uuid } = profileIdentifierRequest;
		const isProfileExisted = await this.profileWriteRepository.retrieveProfileById(uuid);

		if (!isProfileExisted) throw UseCaseResult.fail(new ProfileNotFound(uuid)).getError();

		await this.profileWriteRepository.deleteProfile(uuid);

		return UseCaseResult.success<void>();
	}
}

export default DeleteProfile;
