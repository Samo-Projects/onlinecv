import { UseCaseError } from 'SharedKernel/Definition/UseCase';

class ProfileInvalidRequest extends UseCaseError {
	constructor(requestType: string, requestPayload: string) {
		super(`${requestType} : ${requestPayload}`);
	}
}

export default ProfileInvalidRequest;
