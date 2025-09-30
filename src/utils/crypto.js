import CryptoJS from 'crypto-js';


// 使用SHA-2（SHA-256）哈希函数对密码进行哈希处理
export function hashPassword(password, salt) {
  const hash = CryptoJS.SHA256(password + salt).toString();
  return hash;
}