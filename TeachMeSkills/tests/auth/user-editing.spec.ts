import { test, expect } from '@playwright/test';
import { API_URL, AUTH_CREDENTAILS, STATUS_CODES } from '../../constants';
import { CredentailsGenerator, getTokens } from '../../utils';
import {
    PasswordResetConfirmRequest,
    SendEmailResetRequest,
    SendEmailResetSchema,
    SetPasswordRequest,
    SetPasswordSchema,
    SetUsernameRequest,
    SetUsernameSchema,
    UsernameResetConfirmRequest,
    UsernameResetConfirmSchema,
} from '../../types';

let accessToken: string;
const authHeaders = {
    Authorization: '',
};

test.describe('User editing tests', () => {
    test.beforeAll(async ({ request }) => {
        [accessToken] = await getTokens(request);
        authHeaders.Authorization = 'Bearer ' + accessToken;
    });

    test.skip('Reset email', async ({ request }) => {
        const resetRequestBody: SendEmailResetRequest = {
            email: AUTH_CREDENTAILS.EMAIL,
        };

        const resetResponse = await request.post(`${API_URL}/auth/users/reset_email/`, {
            headers: {
                ...authHeaders,
            },
            data: resetRequestBody,
        });
        expect(resetResponse.status()).toEqual(STATUS_CODES.OK);

        const { email: oldEmail } = SendEmailResetSchema.parse(await resetResponse.json());
        expect(oldEmail).toEqual(AUTH_CREDENTAILS.EMAIL);

        const generatedEmail = CredentailsGenerator.generateEmail();
        const resetConfirmRequestBody: UsernameResetConfirmRequest = {
            new_email: generatedEmail,
        };

        const resetConfirmResponse = await request.post(`${API_URL}/auth/users/reset_email_confirm/`, {
            headers: {
                ...authHeaders,
            },
            data: resetConfirmRequestBody,
        });
        expect(resetConfirmResponse.status()).toEqual(STATUS_CODES.OK);

        const { new_email } = UsernameResetConfirmSchema.parse(await resetConfirmResponse.json());
        expect(new_email).toEqual(generatedEmail);
    });

    test.skip('Reset password', async ({ request }) => {
        const resetRequestBody: SendEmailResetRequest = {
            email: AUTH_CREDENTAILS.EMAIL,
        };

        const resetResponse = await request.post(`${API_URL}/auth/users/reset_password/`, {
            headers: {
                ...authHeaders,
            },
            data: resetRequestBody,
        });
        expect(resetResponse.status()).toEqual(STATUS_CODES.OK);

        const { email: oldEmail } = SendEmailResetSchema.parse(await resetResponse.json());
        expect(oldEmail).toEqual(AUTH_CREDENTAILS.EMAIL);

        // for auth/users/reset_password_confirm/ is neccessary to have uid? getted from email message
    });

    test.skip('Set email', async ({ request }) => {
        const generatedEmail = CredentailsGenerator.generateEmail();
        const requestBody: SetUsernameRequest = {
            new_email: generatedEmail,
            current_password: AUTH_CREDENTAILS.PASSWORD,
        };

        const response = await request.post(`${API_URL}/auth/users/set_email/`, {
            headers: {
                ...authHeaders,
            },
            data: requestBody,
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const { new_email, current_password } = SetUsernameSchema.parse(await response.json());
        expect(new_email).toEqual(generatedEmail);
        expect(current_password).toEqual(AUTH_CREDENTAILS.PASSWORD);
    });

    test.skip('Set password', async ({ request }) => {
        const generatedPassword = CredentailsGenerator.generatePassword();
        const requestBody: SetPasswordRequest = {
            current_password: AUTH_CREDENTAILS.PASSWORD,
            new_password: generatedPassword,
        };

        const response = await request.post(`${API_URL}/auth/users/set_password/`, {
            headers: {
                ...authHeaders,
            },
            data: requestBody,
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const { current_password, new_password } = SetPasswordSchema.parse(await response.json());
        expect(current_password).toEqual(AUTH_CREDENTAILS.PASSWORD);
        expect(new_password).toEqual(generatedPassword);
    });
});
