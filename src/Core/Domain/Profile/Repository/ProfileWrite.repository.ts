import { Profile } from '../';

interface ProfileWriteRepository {
	retrieveProfileById(uuid: string): Promise<Profile>;
	saveProfile(profile: Profile): Promise<void>;
	deleteProfile(uuid: string): Promise<void>;
}

export default ProfileWriteRepository;
