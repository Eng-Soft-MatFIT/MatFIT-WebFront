export interface User {
    cpf: string,
    nome: string,
    esporte: string,
}

export interface UserResponse {
    cpf: string,
    nome: string,
    esporte: string,
    dataPagamento: string,
    pagamentoAtrasado: boolean
}

export interface UserUpdate {
    nome: string,
    esporte: string,
}