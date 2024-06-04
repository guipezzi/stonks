interface IEstoque {
  id: string;
  nome: string;
  marca: string;
  tipo: string;
  quantidade: number;
  precoUnit: number;
  estoqueMin: number;
  imageUrl: string; // Adicionar a propriedade imageUrl
}

function createIEstoque(): IEstoque {
  return {
    id: '',
    nome: '',
    marca: '',
    tipo: '',
    quantidade: 0,
    precoUnit: 0,
    estoqueMin: 0,
    imageUrl: '', // Inicializar a propriedade imageUrl
  };
}

export { IEstoque, createIEstoque };
