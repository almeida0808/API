const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp"); // indica o local da pasta tmp(temporaria) usando o path
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
  // multer é a biblioteca que vamos usar para fazer o upload
  storage: multer.diskStorage({
    destination: TMP_FOLDER, // informa onnde vamos guardar o arquivo
    filename(request, file, callback) {
      // informa qual vai ser o nome do arquivo
      const fileHash = crypto.randomBytes(10).toString("hex"); //cria um nome cryptografado e aleatorio
      const filename = `${fileHash}-${file.originalname}`; // junta o nome cryptografado com o nome original

      return callback(null, filename); // retorna como primeiro parametro null por padrão e o filename
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
};
