import { Profile } from 'Core/Domain/Profile';

interface ProfileReadRepository {
	retrieveByUuid(uuid: string): Promise<Profile>;
	retrieveByEmail(email: string): Promise<Profile>;
	retrieveAllProfiles(): Promise<Profile[]>;
}

export default ProfileReadRepository;
