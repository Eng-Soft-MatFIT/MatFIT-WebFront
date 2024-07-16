export interface Funcionario {
    cpf: string;
    nome : string;
    funcao: string;
    cargaHoraria : number;
}

export interface FuncionarioUpdate {
    nome : string;
    funcao: string;
    cargaHoraria : number;
}