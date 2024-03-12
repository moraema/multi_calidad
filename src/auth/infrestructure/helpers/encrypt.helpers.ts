import bcrypt from "bcrypt";
import { IEcryptService } from "../../application/service/encrypt.service";

export class EncryptService implements IEcryptService {
  authPassword(word: string, passwordEncode: string): boolean {
    const result = bcrypt.compareSync(word, passwordEncode);
    return result;
  }
}
