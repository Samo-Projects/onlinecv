import { ProfileInvalidRequest, ProfileNotFound } from 'Core/Application/Profile/Command/Error';
import { UseCaseResult } from 'SharedKernel/Definition/UseCase';

type UpdateProfileResponse = UseCaseResult<ProfileInvalidRequest | ProfileNotFound, void>;

export default UpdateProfileResponse;
