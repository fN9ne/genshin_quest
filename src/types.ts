export interface IJSONBinResponse {
	metadata: {
		createdAt: Date;
		id: string;
		name: string;
		private: boolean;
	};
	record: {
		mondstadt: IQuest[];
		liyue: IQuest[];
		dragonspine: IQuest[];
		chasm: IQuest[];
		inazuma: IQuest[];
		enkanomiya: IQuest[];
		sumeru: IQuest[];
		fontaine: IQuest[];
		chenyu: IQuest[];
	};
}

export interface IQuest {
	id: number;
	quest: string;
	source: string;
	link: string;
}
