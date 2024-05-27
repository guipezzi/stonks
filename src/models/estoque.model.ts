interface IEstoque {
  id: string;
  nome: string;
  marca: string;
  tipo: string;
  quantidade: number;
  precoUnit: number;
  estoqueMin: number;
}
function createIEstoque() {
  return {
    id: '',
    nome: '',
    marca: '',
    tipo: '',
    quantidade: 0,
    precoUnit: 0,
    estoqueMin: 0,
  };
}
export { IEstoque, createIEstoque };
