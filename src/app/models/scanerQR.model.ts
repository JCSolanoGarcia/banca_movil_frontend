export class ScannerQRInterface{
    public format: string;
    public text: string;
    public type: string;
    
    constructor(format: string, text: string){
        this.format = format;
        this.text = text;
        this.determinarTipo();
    }

    private determinarTipo(){
        const inicioTexto = this.text.substr(0,4);
        console.log('Tipo', inicioTexto);

        switch(inicioTexto){
            case 'http':
                this.type= 'http no reconocido';
                break;
            case 'geo:':
                this.type= ' geo no reconocido';
                break;
            default:
                this.type= 'Transferencia'
       
        }
        
    }
}