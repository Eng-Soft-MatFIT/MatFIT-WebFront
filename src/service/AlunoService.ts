import { User } from "../types/User";

export class AlunoService {

  apiUrl = "http://localhost:8080";

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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

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
        console.log(data);
  
      } catch (error) {
        console.error('Erro ao inserir aluno:', error);
      }
  }
}
