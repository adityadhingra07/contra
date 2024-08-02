export interface Exclusion {
	[key: string]: string | boolean;
}

export interface Contract {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	url: string;
	userId: string;
}
