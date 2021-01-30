package net.thekingofduck.loki.common;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.SecureRandom;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;


/**
 * Project: loki
 * Date:2021/1/8 下午11:19
 * @author CoolCat
 * @version 1.0.0
 * Github:https://github.com/TheKingOfDuck
 * When I wirting my code, only God and I know what it does. After a while, only God knows.
 */

public class Crypto {

    static Log log = LogFactory.get(Thread.currentThread().getStackTrace()[1].getClassName());

    public static void main(String[] args) throws Exception {
        String username = "CoolCat";
        String key = "mimahenchang";
        System.out.println(encrypt(username,key));
        System.out.println(decrypt("aiUa4P6GwgaSIXO/N2d6zg==","mimahenchang"));
    }

    /**
     * 生成密钥对象
     */
    private static SecretKey generateKey(byte[] key) throws Exception {
        // 根据指定的 RNG 算法, 创建安全随机数生成器
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        random.setSeed(key);
        KeyGenerator gen = KeyGenerator.getInstance("AES");
        gen.init(128, random);
        return gen.generateKey();
    }

    /**
     * 数据加密: 明文 -> 密文
     */
    public static String encrypt(String plainText, String key) throws Exception {

        //log.info(String.format("Encrypt: %s\t%s",plainText,key));

        SecretKey secKey = generateKey(key.getBytes());

        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, secKey);

        String cryptStr = new BASE64Encoder().encode(cipher.doFinal(plainText.getBytes()));

        //log.info("Encrypted: " + cryptStr);

        return cryptStr;
    }

    /**
     * 数据解密: 密文 -> 明文
     */
    public static String decrypt(String cipherStr, String key) throws Exception {

        //log.info(String.format("Decrypt: %s\t%s",cipherStr,key));

        byte[] cipherBytes = new BASE64Decoder().decodeBuffer(cipherStr);

        SecretKey secKey = generateKey(key.getBytes());
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, secKey);

        String plainText = new String(cipher.doFinal(cipherBytes), "UTF-8");
        //log.info("Decrypted: " + plainText);
        return plainText;
    }
}
