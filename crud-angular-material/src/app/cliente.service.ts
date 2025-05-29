import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  salvar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  atualizar(cliente: Cliente): void {
    const storage = this.obterStorage();
    storage.forEach((_cliente) => {
      if (_cliente.id === cliente.id) {
        Object.assign(_cliente, cliente);
      }
    });

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  deletar(cliente: Cliente): void {
    const storage = this.obterStorage();

    let novaListaClientes = storage.filter((_cliente) => _cliente.id !== cliente.id);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaListaClientes));
  }

  pesquisarClientes(nomeBusca: string): Cliente[] {
    const clientes: Cliente[] = this.obterStorage();

    if (!nomeBusca) {
      return clientes;
    }

    return clientes.filter((cliente) => cliente.nome?.indexOf(nomeBusca) !== -1);
  }

  buscarClientePorId(id: string): Cliente | undefined {
    const clientes: Cliente[] = this.obterStorage();
    return clientes.find((cliente) => cliente.id === id);
  }

  private obterStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }
}
