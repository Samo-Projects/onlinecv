import { ProfileInvalidRequest } from 'Core/Application/Profile/Command/Error';
import { UseCaseResult } from 'SharedKernel/Definition/UseCase';

type DeleteProfileResponse = UseCaseResult<ProfileInvalidRequest, void>;

export default DeleteProfileResponse;
