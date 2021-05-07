import { UseCaseError } from 'SharedKernel/Definition/UseCase';

class ProfileNotFound extends UseCaseError {
	constructor(profileName: string) {
		super(`The profile « ${profileName} » doesn't exist.`);
	}
}

export default ProfileNotFound;
