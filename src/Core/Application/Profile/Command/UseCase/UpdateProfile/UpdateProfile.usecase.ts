import { validateOrReject } from 'class-validator';
import { ProfileInvalidRequest, ProfileNotFound } from 'Core/Application/Profile/Command/Error';
import { ProfileBuilder } from 'Core/Domain/Profile';
import { ProfileRequest } from 'Core/Domain/Profile/Model';
import { ProfileWriteRepository } from 'Core/Domain/Profile/Repository';
import { UseCase, UseCaseResult } from 'SharedKernel/Definition/UseCase';

import { UpdateProfileResponse } from './';

class UpdateProfile implements UseCase<ProfileRequest, UpdateProfileResponse> {
	requestType = 'UPDATING_PROFILE';

	constructor(private profileWriteRepository: ProfileWriteRepository) {}

	async execute(profileRequest: ProfileRequest): Promise<UpdateProfileResponse> {
		if (profileRequest && Object.keys(profileRequest).length === 0 && profileRequest.constructor === Object)
			throw UseCaseResult.fail(new ProfileInvalidRequest(this.requestType, `No data is entered.`)).getError();

		const {
			uuid,
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

		const isProfileExisted = await this.profileWriteRepository.retrieveProfileById(uuid as string);

		if (!isProfileExisted) throw UseCaseResult.fail(new ProfileNotFound(name)).getError();

		const profile = new ProfileBuilder()
			.withUuid(uuid)
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

export default UpdateProfile;
