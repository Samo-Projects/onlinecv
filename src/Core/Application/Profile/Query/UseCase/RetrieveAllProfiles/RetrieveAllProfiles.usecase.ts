import { Profile } from 'Core/Domain/Profile';
import { ProfileReadRepository } from 'Core/Domain/Profile/Repository';
import { UseCase, UseCaseResult } from 'SharedKernel/Definition/UseCase';

import { RetrieveAllProfilesResponse } from './';

class RetrieveAllProfiles implements UseCase<unknown, RetrieveAllProfilesResponse> {
	constructor(private profileReadRepository: ProfileReadRepository) {}

	async execute(): Promise<RetrieveAllProfilesResponse> {
		const profiles = await this.profileReadRepository.retrieveAllProfiles();
		return UseCaseResult.success<Profile[]>(profiles);
	}
}

export default RetrieveAllProfiles;
