using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLogic.Services;
public class EncryptionService
{
    private static bool AreHashesEqual(byte[] hash1, byte[] hash2)
    {
        int diff = hash1.Length ^ hash2.Length;
        for (int i = 0; i < hash1.Length && i < hash2.Length; i++)
        {
            diff |= hash1[i] ^ hash2[i];
        }
        return diff == 0;
    }
    public (string hash, string salt) SaltAndHash(string password, uint length, int countop = 100_000)
    {
        if (string.IsNullOrWhiteSpace(password))
        {
            throw new ArgumentNullException(nameof(password));
        }
        var salt = RandomNumberGenerator.GetBytes((int)length);

        using var pbkdf = new Rfc2898DeriveBytes(password, salt, countop, HashAlgorithmName.SHA256);

        var hash = pbkdf.GetBytes(32);

        return (Convert.ToBase64String(hash), Convert.ToBase64String(salt));
    }
    public static bool VerifyPassword(string password, string hash, string salt)
    {

        byte[] saltB = Convert.FromBase64String(salt);

        byte[] storedPasswordHash = Convert.FromBase64String(hash);

        using var pbkdf2 = new Rfc2898DeriveBytes(password, saltB, 100_000, HashAlgorithmName.SHA256);

        byte[] hashB = pbkdf2.GetBytes(32);

        return AreHashesEqual(hashB, storedPasswordHash);
    }

}
