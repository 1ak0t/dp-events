export enum UserRoles {
    Admins = "Администраторы",
    Secretaries = "Секретари",
    Users = "Пользователи"
}

export type UserType = {
    surname: string;
    name: string;
    middleName: string;
    email: string;
    role: UserRoles[];
    jobTitle: string;
}
