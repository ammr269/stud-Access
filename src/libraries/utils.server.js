import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds); // Correct
}

export async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword); // Fonction correcte pour vérifier le mot de passe
}
