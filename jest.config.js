module.exports = {
  bail: true, // caso algun teste falhe ele para de executar para que possamos resolver o erro
  coverageProvider: "v8", // informa que o mecanismo v8 vai ser usado para coletar os dados

  testMatch: ["<rootDir>/src/**/*.spec.js"], // explicação do caminho:
  // <rootDir> = Raiz do arquivo
  // pasta src
  // entra em todas/qualquer pastas
  // roda o teste em todo arquivo que tenha esse formato NomeDoArquivo.spec.js
};
