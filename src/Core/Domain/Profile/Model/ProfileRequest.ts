interface ProfileRequest {
	uuid?: string;
	name: string;
	firstName: string;
	lastName: string;
	nationality: string;
	birthDate: Date;
	address: string;
	postalCode: string;
	city: string;
	country: string;
	email: string;
	profession?: string;
	link?: string;
	photo?: string;
	isRoundPhoto?: boolean;
	objective?: string;
}

export default ProfileRequest;
