import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-consulta',
  imports: [
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
})
export class ConsultaComponent {

  nomeBusca: string = '';

  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email', 'acoes'];
  readonly dialog = inject(MatDialog);
  snackBar: MatSnackBar = inject(MatSnackBar);

  constructor(
    private service: ClienteService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
    this.cdr.detectChanges(); // ChangeDetectorRef
  }

  pesquisar() {
    this.carregarClientes();
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } })
  }

  preparaDeletar(cliente: Cliente): void {
    const dialogRef = this.openDialog(cliente);
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.deletar(cliente);
      }
    });
  }

  deletar(cliente: Cliente): void {
    this.service.deletar(cliente);
    this.carregarClientes();
    this.mostrarMensagem("Item deletado com sucesso!")
  }

  openDialog(cliente: Cliente) {

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: {
        mensagem: `Você deseja excluir o cliente ${cliente.nome}`
      }
    });

    return dialogRef;
  }

  mostrarMensagem(mensagem: string) {
    this.snackBar.open(mensagem, "ok")
  }
}
