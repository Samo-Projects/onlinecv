import { ProfileInvalidRequest } from 'Core/Application/Profile/Command/Error';
import { Profile } from 'Core/Domain/Profile';
import { ProfileIdentifierRequest } from 'Core/Domain/Profile/Model';
import { ProfileReadRepository } from 'Core/Domain/Profile/Repository';
import { UseCase, UseCaseResult } from 'SharedKernel/Definition/UseCase';

import { RetrieveDetailProfileResponse } from './';

class RetrieveDetailProfile implements UseCase<ProfileIdentifierRequest, RetrieveDetailProfileResponse> {
	requestType = 'RETRIEVING_PROFILE';

	constructor(private profileReadRepository: ProfileReadRepository) {}

	async execute(profileIdentifierRequest: ProfileIdentifierRequest): Promise<RetrieveDetailProfileResponse> {
		if (profileIdentifierRequest && Object.keys(profileIdentifierRequest).length === 0 && profileIdentifierRequest.constructor === Object)
			throw UseCaseResult.fail(new ProfileInvalidRequest(this.requestType, `No data is entered.`)).getError();

		const { uuid } = profileIdentifierRequest;
		const profile = await this.profileReadRepository.retrieveByUuid(uuid);

		return UseCaseResult.success<Profile>(profile);
	}
}

export default RetrieveDetailProfile;
