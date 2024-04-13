export interface IJSONBinResponse {
	metadata: {
		createdAt: Date;
		id: string;
		name: string;
		private: boolean;
	};
	record: {
		mondstadt: ISubRegion[];
		liyue: ISubRegion[];
		dragonspine: ISubRegion[];
		chasm: ISubRegion[];
		inazuma: ISubRegion[];
		enkanomiya: ISubRegion[];
		sumeru: ISubRegion[];
		fontaine: ISubRegion[];
		chenyu: ISubRegion[];
	};
}

export interface IQuest {
	id: number;
	quest: string;
	source: string;
	link: string;
}

export interface ISubRegion {
	name: string;
	content: IQuest[];
}

export interface IQuestsData {
	mondstadt: ISubRegion[];
	liyue: ISubRegion[];
	dragonspine: ISubRegion[];
	chasm: ISubRegion[];
	inazuma: ISubRegion[];
	enkanomiya: ISubRegion[];
	sumeru: ISubRegion[];
	fontaine: ISubRegion[];
	chenyu: ISubRegion[];
}
