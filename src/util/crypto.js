import crypto from 'crypto';

function aesEncrypt(data, key = '15267617473') {
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted, key = '15267617473') {
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/*
// 事例
const data = 'hellohellohellohellohello';
// const key = 'Password!';
const encrypted = aesEncrypt(data);
const decrypted = aesDecrypt(encrypted);
console.log(`Plain text: ${data}`);
console.log(`Encrypted text: ${encrypted}`);
console.log(`Decrypted text: ${decrypted}`);
*/

export default {
  aesEncrypt,
  aesDecrypt,
};
