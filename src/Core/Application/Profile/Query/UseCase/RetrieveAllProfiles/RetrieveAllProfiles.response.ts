import { Profile } from 'Core/Domain/Profile';
import { UseCaseResult } from 'SharedKernel/Definition/UseCase';

type RetrieveAllProfilesResponse = UseCaseResult<unknown, Profile[]>;

export default RetrieveAllProfilesResponse;
