import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemLista } from './itemLista';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-compras',
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.scss'
})
export class ListaComprasComponent {

  item: string = '';
  itens: ItemLista[] = [];

  adicionarItem(): void {

    let itemLista = new ItemLista();
    itemLista.id = this.itens.length + 1;
    itemLista.nome = this.item;
    this.itens.push(itemLista);

    this.item = '';
  }

  selecionarItem(item: ItemLista) {
    item.comprado = !item.comprado;
  }

  limparLista() {
    this.itens = [];
  }
}
