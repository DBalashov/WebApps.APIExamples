export interface IExternalSettings {
    Urls: IExternalSettingsUrls;
    Token: string;

    User?: IUser;
    Organization: IOrganization;
    Settings: {};
}

export interface IExternalSettingsUrls {
    Service: string;
    Relative: string;
    Content: string;
}

export interface IUser {
    ID: number;
    UID: string;
    Name: string;
    Login: string;
    Mail: string;
}

export interface IOrganization {
    ID: number;
    UID: string;
    Name: string;
}
