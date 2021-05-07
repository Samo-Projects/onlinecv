import { Profile } from 'Core/Domain/Profile';
import { ProfileReadRepository } from 'Core/Domain/Profile/Repository';

class InMemoryProfileReadRepository implements ProfileReadRepository {
	constructor(private readonly profiles: Profile[] = []) {}

	async retrieveByUuid(uuid: string): Promise<Profile> {
		return this.profiles.filter((profilePredicate) => profilePredicate.uuid === uuid)[0];
	}

	async retrieveByEmail(email: string): Promise<Profile> {
		return this.profiles.filter((profilePredicate) => profilePredicate.email === email)[0];
	}

	async retrieveAllProfiles(): Promise<Profile[]> {
		return this.profiles;
	}

	feedTheProfilesWith(profiles: Profile[]) {
		this.profiles.push(...profiles);
	}
}

export default InMemoryProfileReadRepository;
