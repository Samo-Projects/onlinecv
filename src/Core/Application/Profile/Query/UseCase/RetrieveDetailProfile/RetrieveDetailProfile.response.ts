import { ProfileInvalidRequest, ProfileNotFound } from 'Core/Application/Profile/Command/Error';
import { Profile } from 'Core/Domain/Profile';
import { UseCaseResult } from 'SharedKernel/Definition/UseCase';

type RetrieveDetailProfileResponse = UseCaseResult<ProfileInvalidRequest | ProfileNotFound, Profile>;

export default RetrieveDetailProfileResponse;
