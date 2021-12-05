import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;
  titleTable ="Crear producto";
  id: String | null;

  constructor(private fb:FormBuilder,
               private router:Router,
               private toastr: ToastrService,
               private _productoService: ProductoService,
               private aRouter: ActivatedRoute) { 
    
    this.productoForm = this.fb.group({
      
      nombre: ['', Validators.required],
      precioCompra: ['', Validators.required],
      precioVenta: ['', Validators.required],
      presentacion: ['', Validators.required],
      categoria: ['', Validators.required],
      
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editarPro();
  }
  agregarProducto(){
    console.log(this.productoForm)

    const PRODUCTO: Producto={
      nombre: this.productoForm.get('nombre')?.value,
      precioCompra: this.productoForm.get('precioCompra')?.value,
      precioVenta: this.productoForm.get('precioVenta')?.value,
      presentacion: this.productoForm.get('presentacion')?.value,
      categoria: this.productoForm.get('categoria')?.value,
    }

    if(this.id !==null){
      // se edita el producto
      this._productoService.editarProducto(this.id,PRODUCTO).subscribe(DATA =>{
        console.log("Actualizado con exito");
        this.toastr.info('Actualizado con exito', 'Producto actualizado!');
        this.router.navigate(['/']);
      }, error =>{
        console.log(error);
      })
    }
    else{
      // se agrega el producto
      console.log(PRODUCTO);

    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
      console.log("Guardado con exito");
      this.toastr.success('Guardado con exito', 'Producto registrado!');
      this.router.navigate(['/']);
    }, error =>{
      console.log(error);
      this.productoForm.reset();
      
    });
    }
    
  }
  editarPro(){
    if(this.id !== null){
      this.titleTable='Editar Producto';
      this._productoService.obtenerProducto(this.id).subscribe(data =>{
        this.productoForm.setValue({
          nombre: data.nombre,
          precioCompra: data.precioCompra,
          precioVenta: data.precioVenta,
          presentacion: data.presentacion,
          categoria: data.categoria,
        });
      })
    }
  }

}
