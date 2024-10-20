import { EquipamentoUpdate } from "../types/Equipamento";

export class EquipamentoService {

  apiUrl = "https://matfit-api-production.up.railway.app";

  async insertEquipamento(equipamento: EquipamentoUpdate) {
    try {
      const response = await fetch(`${this.apiUrl}/equipamento`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipamento),
      });

      if (!response.ok) {
        alert("CPF inválido ou já cadastrado!");
        return;
      } 

      alert("Equipamento cadastrado com sucesso!")

    } catch (error) {
      console.error('Erro ao inserir equipamento:', error);
    }
  }

  async findAllEquipamento() {
    try {
        const response = await fetch(`${this.apiUrl}/equipamento`, {
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

  async updateEquipamento( id : number, equipamento : EquipamentoUpdate){
    try {
      const response = await fetch(`${this.apiUrl}/equipamento/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipamento),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Erro ao atualizar equipamento:', error);
    }
  }

  async removeEquipamento(id : number) {
    try {
      const response = await fetch(`${this.apiUrl}/equipamento/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        alert("equipamento removido com sucesso!");
      }

    } catch (error) {
      console.error('Erro ao remover equipamento:', error);
    }
  }
}
