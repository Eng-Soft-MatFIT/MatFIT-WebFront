import { FuncionarioResponse, FuncionarioUpdate } from "../types/Funcionario";

export class FuncionarioService {

  apiUrl = "https://matfit-api-production.up.railway.app";

  async insertFuncionario(funcionario: FuncionarioResponse) {
    try {
      const response = await fetch(`${this.apiUrl}/funcionario`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(funcionario),
      });

      if (!response.ok) {
        alert("CPF inválido ou já cadastrado!");
        return;
      } 

      alert("funcionario cadastrado com sucesso!")

    } catch (error) {
      console.error('Erro ao inserir funcionario:', error);
    }
  }

  async findAllFuncionario() {
    try {
        const response = await fetch(`${this.apiUrl}/funcionario`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
  
      } catch (error) {
        console.error(error);
        return [];
      }
  }

  async updateFuncionario( cpf : string, funcionario : FuncionarioUpdate){
    try {
      const response = await fetch(`${this.apiUrl}/funcionario/${cpf}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(funcionario),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Erro ao atualizar funcionario:', error);
    }
  }

  async removeFuncionario(cpf : string) {
    try {
      const response = await fetch(`${this.apiUrl}/funcionario/${cpf}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        alert("funcionario removido com sucesso!");
      }

    } catch (error) {
      console.error(error);
    }
  }
}
