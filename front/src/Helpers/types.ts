export enum ButtonStatus {
    X='X' ,
    O= '0',
    INITIAL= ' '
}

export type TriquiCell = {
    status: ButtonStatus
    crossed: boolean
}