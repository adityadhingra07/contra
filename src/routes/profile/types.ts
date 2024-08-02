export interface Question {
	[key: string]: string | boolean;
}

export interface Profile {
	pbmName: string;
	parentCompany: string;
	yearFounded: number | null;
	headquartersLocation: string;
	marketShare: number;
	numberOfCoveredLives: number;
	contractTypesTraditional: boolean;
	contractTypesPrebate: boolean;
	MedPrograms: Question;
	DataSharing: Question;
}
