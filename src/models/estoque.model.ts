interface IEstoque {
    id: string;
    nome: string;
    marca: string;
    tipo: string;
    quantidade: string;
    precoUnit: string;
    estoqueMin: string;
};
function createIEstoque() {
    return {
        id: '',
        nome: '',
        marca: '',
        tipo: '',
        quantidade: '',
        precoUnit: '',
        estoqueMin: ''
        };
}
export { IEstoque, createIEstoque };