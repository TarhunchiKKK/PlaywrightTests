import { generate } from 'randomstring';

class StringGenerator {
    public generateUsername() {
        return 'test_' + generate({ length: 15, charset: 'alphabetic' });
    }

    public generateEmail() {
        return 'test_' + generate({ length: 7, charset: 'alphabetic' }) + '@example.com';
    }

    public generatePassword() {
        return generate({ length: 15, charset: 'alphanumeric' });
    }
}

export const CredentailsGenerator = new StringGenerator();
