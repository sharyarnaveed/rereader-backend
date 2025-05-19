const crypto = require("crypto");

// encryption
const algorithm = "aes-256-cbc";
const key = crypto
  .createHash("sha256")
  .update(String(process.env.URLENCODE))
  .digest(); // 32-byte key
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

const decrypt = (text) => {
  const textParts = text.split(":");
  const receivedIv = Buffer.from(textParts[0], "hex");
  const encryptedText = textParts[1];

  const decipher = crypto.createDecipheriv(algorithm, key, receivedIv);
  let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
};

module.exports = { encrypt, decrypt };
