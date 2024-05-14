const fs = require("fs"); // do propio node pra manipular arquivos
const path = require("path");
const uploadCOnfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    //rename não é mudar o nome e sim mudar ele de lugar
    await fs.promises.rename(
      path.resolve(uploadCOnfig.TMP_FOLDER, file), // pega o arquivo na pasta temporaria
      path.resolve(uploadCOnfig.UPLOADS_FOLDER, file) // envia para pasta upload
    );
    return file; // retorna informações do arquivo
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadCOnfig.UPLOADS_FOLDER, file);
    try {
      await fs.promises.stat(filePath); // verifica se o arquivo existe no caminho indicado
    } catch {
      // caso não exista retorne
      return;
    }
    await fs.promises.unlink(filePath); // se o arquivo existe ´feito a exclusão usando o unlink
  }
}

module.exports = DiskStorage;
