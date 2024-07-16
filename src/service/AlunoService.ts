import { User, UserResponse, UserUpdate } from "../types/User";

export class AlunoService {

  apiUrl = "https://mat-fit.up.railway.app";

  async insertUser(aluno: User) {
    try {
      const response = await fetch(`${this.apiUrl}/aluno`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
      });

      if (!response.ok) {
        alert("CPF inválido ou já cadastrado!");
        return;
      } 

      alert("Aluno cadastrado com sucesso!")

    } catch (error) {
      console.error('Erro ao inserir aluno:', error);
    }
  }

  async findAllUsers() {
    try {
        const response = await fetch(`${this.apiUrl}/aluno`, {
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
        console.error('Erro ao inserir aluno:', error);
        return [];
      }
  }

  async updateUser( cpf : string, aluno : UserUpdate){
    try {
      const response = await fetch(`${this.apiUrl}/aluno/${cpf}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Erro ao inserir aluno:', error);
    }
  }

  async removeUser(cpf : string) {
    try {
      const response = await fetch(`${this.apiUrl}/aluno/${cpf}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        alert("Aluno removido com sucesso!");
      }

    } catch (error) {
      console.error('Erro ao inserir aluno:', error);
    }
  }

  async verifyPayment( cpf : string ) {
    try {
      const response = await fetch(`${this.apiUrl}/aluno/pagamento/${cpf}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        alert("CPF não encontrado");
        return;
      } 

      const data : UserResponse = await response.json();
      return data;

    } catch (error) {
      console.error('Erro ao inserir aluno:', error);
    }
  }

  async confirmPayment( cpf : string ) {
    try {
      const response = await fetch(`${this.apiUrl}/aluno/pagar/${cpf}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        alert("CPF não encontrado");
        return;
      } 

      alert("Pagamento efetuado com sucesso!");

    } catch (error) {
      console.error('Erro ao inserir aluno:', error);
    }
  }
}
