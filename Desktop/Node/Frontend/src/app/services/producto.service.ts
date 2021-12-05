import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url= 'http://localhost:4000/api/productos/';

  constructor(private http: HttpClient) {}
    
  // metodo listar
  getproductos(): Observable <any>{
      return this.http.get(this.url);
  }
  // metodo eliminar
  eliminarProducto(id: String): Observable <any>{
    return this.http.delete(this.url + id);
  }
  // Guardar o registrar un nuevo producto
  guardarProducto(producto:Producto): Observable <any>{
    return this.http.post(this.url, producto);
  }
  obtenerProducto(id:String): Observable <any>{
    return this.http.get(this.url + id);
  }
  editarProducto(id:String, producto:Producto): Observable<any>{
    return this.http.put(this.url + id,producto);
  }

}
