export class Producto{
    _id?: number;
    nombre: String;
    precioCompra: number;
    precioVenta:number;
    presentacion: string;
    categoria: string;
    
    constructor(nombre: string, precioCompra: number, precioVenta:number, presentacion: string, categoria: string){
        this.nombre=nombre;
        this.precioCompra=precioCompra;
        this.precioVenta=precioVenta;
        this.presentacion=presentacion;
        this.categoria=categoria;

    }
}