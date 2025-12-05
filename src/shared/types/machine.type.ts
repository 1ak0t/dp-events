export enum MachinesStatus {
    Work = "Работает",
    Warning = "Работает нештатно",
    Inspection = "Требует внимания",
    Wrong = "Поломка"
}

export type MachineType = {
    name: string;
    status: MachinesStatus;
}