export interface IQuest {
	id: number;
	quest: string;
	source: string;
	link: string;
	isReputation: boolean;
}

export interface ISubRegion {
	name: string;
	content: IQuest[];
}

/* #UPDATEABLE */
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
