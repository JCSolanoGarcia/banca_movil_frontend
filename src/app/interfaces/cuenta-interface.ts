export interface CuentaInterface{
    alias: string;
    nombre_banco: string;
    tipo_cuenta: number;   
    numero_cuenta: string;
    identificacion_titular: string;
    moneda: string;
    saldo: number;
    idCreador: string;
}