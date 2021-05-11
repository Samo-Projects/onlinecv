import { validateOrReject } from 'class-validator';
import { ProfileInvalidRequest } from 'Core/Application/Profile/Command/Error';
import { ProfileBuilder } from 'Core/Domain/Profile';
import { ProfileRequest } from 'Core/Domain/Profile/Model';
import { ProfileReadRepository, ProfileWriteRepository } from 'Core/Domain/Profile/Repository';
import { UseCase, UseCaseResult } from 'SharedKernel/Definition/UseCase';

import { CreateProfileResponse } from './';

class CreateProfile implements UseCase<ProfileRequest, CreateProfileResponse> {
	requestType = 'CREATING_PROFILE';

	constructor(private profileReadRepository: ProfileReadRepository, private profileWriteRepository: ProfileWriteRepository) {}

	async execute(profileRequest: ProfileRequest): Promise<CreateProfileResponse> {
		if (profileRequest && Object.keys(profileRequest).length === 0 && profileRequest.constructor === Object)
			throw UseCaseResult.fail(new ProfileInvalidRequest(this.requestType, 'No data is entered.')).getError();

		const {
			name,
			photo,
			isRoundPhoto,
			firstName,
			lastName,
			profession,
			nationality,
			birthDate,
			address,
			postalCode,
			city,
			country,
			email,
			link,
			objective,
		} = profileRequest;

		const profileExisted = await this.profileReadRepository.retrieveByEmail(email);

		if (profileExisted)
			throw UseCaseResult.fail(
				new ProfileInvalidRequest(this.requestType, 'This email address is already associated to a profile.'),
			).getError();

		const profile = new ProfileBuilder()
			.withName(name)
			.withPhoto(photo)
			.withIsRoundPhoto(isRoundPhoto)
			.withFirstName(firstName)
			.withLastName(lastName)
			.withProfession(profession)
			.withNationality(nationality)
			.withBirthDate(birthDate)
			.withAddress(address)
			.withPostalCode(postalCode)
			.withCity(city)
			.withCountry(country)
			.withEmail(email)
			.withLink(link)
			.withObjective(objective)
			.build();

		await validateOrReject(profile);
		await this.profileWriteRepository.saveProfile(profile);

		return UseCaseResult.success<void>();
	}
}

export default CreateProfile;
