import { Profile } from 'Core/Domain/Profile';
import { ProfileWriteRepository } from 'Core/Domain/Profile/Repository';

class InMemoryProfileWriteRepository implements ProfileWriteRepository {
	constructor(private profiles: Profile[] = []) {}

	async retrieveProfileById(uuid: string): Promise<Profile> {
		return this.profiles.filter((profilePredicate) => profilePredicate.uuid === uuid)[0];
	}

	async saveProfile(profile: Profile): Promise<void> {
		const index = this.profiles.findIndex((profilePredicate) => profilePredicate.uuid === profile.uuid);
		const profilesUpdated =
			-1 === index ? [...this.profiles, profile] : [...this.profiles.slice(0, index), profile, ...this.profiles.slice(index + 1)];
		this.handlerUpdateProfiles(profilesUpdated);
	}

	async deleteProfile(uuid: string): Promise<void> {
		const index = this.profiles.findIndex((profilePredicate) => profilePredicate.uuid === uuid);
		const profilesUpdated = [...this.profiles.slice(0, index), ...this.profiles.slice(index + 1)];
		this.handlerUpdateProfiles(profilesUpdated);
	}

	handlerUpdateProfiles(profiles: Profile[]) {
		this.profiles.length = 0;
		this.profiles.push(...profiles);
	}

	feedTheProfilesWith(profiles: Profile[]) {
		this.profiles.push(...profiles);
	}
}

export default InMemoryProfileWriteRepository;
