import { v4 as uuidv4 } from 'uuid';

import { Profile } from './';

class ProfileBuilder {
	protected uuid?: string;
	protected name: string;
	protected firstName: string;
	protected lastName: string;
	protected nationality: string;
	protected birthDate: Date;
	protected address: string;
	protected postalCode: string;
	protected city: string;
	protected country: string;
	protected email: string;
	protected profession?: string;
	protected link?: string;
	protected photo?: string;
	protected isRoundPhoto?: boolean;
	protected objective?: string;

	withUuid(uuid?: string): ProfileBuilder {
		this.uuid = uuid;
		return this;
	}

	withName(name: string): ProfileBuilder {
		this.name = name;
		return this;
	}

	withFirstName(firstName: string): ProfileBuilder {
		this.firstName = firstName;
		return this;
	}

	withLastName(lastName: string): ProfileBuilder {
		this.lastName = lastName;
		return this;
	}

	withNationality(nationality: string): ProfileBuilder {
		this.nationality = nationality;
		return this;
	}

	withBirthDate(birthDate: Date): ProfileBuilder {
		this.birthDate = birthDate;
		return this;
	}

	withAddress(address: string): ProfileBuilder {
		this.address = address;
		return this;
	}

	withPostalCode(postalCode: string): ProfileBuilder {
		this.postalCode = postalCode;
		return this;
	}

	withCity(city: string): ProfileBuilder {
		this.city = city;
		return this;
	}

	withCountry(country: string): ProfileBuilder {
		this.country = country;
		return this;
	}

	withEmail(email: string): ProfileBuilder {
		this.email = email;
		return this;
	}

	withProfession(profession?: string): ProfileBuilder {
		this.profession = profession;
		return this;
	}

	withLink(link?: string): ProfileBuilder {
		this.link = link;
		return this;
	}

	withPhoto(photo?: string): ProfileBuilder {
		this.photo = photo;
		return this;
	}

	withIsRoundPhoto(isRoundPhoto?: boolean): ProfileBuilder {
		this.isRoundPhoto = isRoundPhoto;
		return this;
	}

	withObjective(objective?: string): ProfileBuilder {
		this.objective = objective;
		return this;
	}

	build(): Profile {
		const uuid = typeof this.uuid !== 'undefined' ? this.uuid : uuidv4();

		return new Profile(
			uuid,
			this.name,
			this.firstName,
			this.lastName,
			this.nationality,
			this.birthDate,
			this.address,
			this.postalCode,
			this.city,
			this.country,
			this.email,
			this.profession,
			this.link,
			this.photo,
			this.isRoundPhoto,
			this.objective,
		);
	}
}

export default ProfileBuilder;
