import { PublicKey } from '@solana/web3.js';

/**
 * 使用 AES-GCM 加密内容
 * @param content 要加密的内容
 * @param key 加密密钥
 */
export async function encryptContent(content: string, key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  
  // 生成随机 IV
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  // 从密钥字符串生成密钥
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  
  // 加密数据
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data
  );
  
  // 将 IV 和加密数据合并
  const result = new Uint8Array(iv.length + encryptedData.byteLength);
  result.set(iv);
  result.set(new Uint8Array(encryptedData), iv.length);
  
  // 返回 base64 编码的结果
  return btoa(String.fromCharCode(...result));
}

/**
 * 解密内容
 * @param encryptedContent base64 编码的加密内容
 * @param key 解密密钥
 */
export async function decryptContent(encryptedContent: string, key: string): Promise<string> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  
  // 解码 base64
  const encryptedData = Uint8Array.from(atob(encryptedContent), c => c.charCodeAt(0));
  
  // 提取 IV 和加密数据
  const iv = encryptedData.slice(0, 12);
  const data = encryptedData.slice(12);
  
  // 从密钥字符串生成密钥
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  
  // 解密数据
  const decryptedData = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data
  );
  
  return decoder.decode(decryptedData);
}

/**
 * 从公钥生成加密密钥
 * @param publicKey Solana 公钥
 */
export function generateKeyFromPublicKey(publicKey: PublicKey): string {
  return publicKey.toBase58();
}

/**
 * 生成随机密钥
 */
export function generateRandomKey(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
} 