const crypto=require("crypto")

// encryption
const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(String("your-secret-passphrase")).digest(); // 32-byte key
const iv = crypto.randomBytes(16);


const encrypt=(text)=>
{ const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
}


const decrypt=(text)=>
{const iv = crypto.randomBytes(16); 
    
    const decipher= crypto.createDecipheriv("aes-256-cbc", Buffer.from(process.env.ENCRYPTION_KEY),iv);
    let decryptedData = decipher.update(text.split(":")[1], "hex", "utf-8");
    decryptedData += decipher.final("utf-8");
    return decryptedData;
}


module.exports={encrypt,decrypt}