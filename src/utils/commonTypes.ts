export type IUserInfoDropdown = {
    id: number;
    userName: string;
    socialIcon: string;
    userAvatar: string;
    socialAccount: string;
}

export type IPostContentType = {
    content: string;
    uploadedFile: string;
};

export type IDropdownType = {
    text: string;
    value: string;
}

export type IStatusType = 'draft' | 'published' | 'scheduled' | 'failed';

export interface Post {
    id: number;
    img: string;
    timestamp: string;
    content: string;
    status: IStatusType;
    account: {
        id: string,
        userId: string,
        platform: string
    }
}


export type IUserContentType = { content: string; imageFiles: Array<ImgType>; } & IUserInfoDropdown;

export type ImgType = {
    imgFile: string;
    id: number
};

export type PostType = {
    id: string;
    platform: string,
    status: string,
    message: string,
    media: string[],
    contentType: string
}

export type ISocialAccountType = {
    id: string;
    name: string;
    platform: string;
}

export type IUserType = {
    id: string;
    userName: string;
    socialAccounts: ISocialAccountType[];
}

export type IGetUserInfoResponse = IUserType & { socialDropdown: IDropdownType[] }

export type ITeamPerson = {
    name: string;
    email: string;
    status: string;
    role: string;
    team:string;
};

export type ITeams = {
    id: string;
    name: string;
}

export type ITeamUserFormProps = {
    id?:string;
    name: string;
    email: string;
    status: string;
    team: string;
    role: string;
}

export type ITeamFormProps ={
    id?:string;
    name:string;
}