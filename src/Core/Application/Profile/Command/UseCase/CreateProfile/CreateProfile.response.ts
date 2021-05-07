import { ProfileInvalidRequest } from 'Core/Application/Profile/Command/Error';
import { UseCaseResult } from 'SharedKernel/Definition/UseCase';

type CreateProfileResponse = UseCaseResult<ProfileInvalidRequest, void>;

export default CreateProfileResponse;
