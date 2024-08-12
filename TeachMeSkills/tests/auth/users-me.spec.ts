import { test, expect } from '@playwright/test';
import { CredentailsGenerator, getTokens } from '../../utils';
import { API_URL, STATUS_CODES } from '../../constants';
import { PatchedUserRequest, UserRequest, UserSchema } from '../../types';

let accessToken: string;
const authHeaders = {
    Authorization: '',
};

test.describe('/auth/users/me/', () => {
    test.beforeAll(async ({ request }) => {
        [accessToken] = await getTokens(request);
        authHeaders.Authorization = 'Bearer ' + accessToken;
    });

    test('GET', async ({ request }) => {
        const response = await request.get(`${API_URL}/auth/users/me/`, {
            headers: {
                ...authHeaders,
            },
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const user = UserSchema.parse(await response.json());
        expect(user.id).toBeDefined();
    });

    test('PUT', async ({ request }) => {
        const generatedUsername = CredentailsGenerator.generateUsername();

        const requestBody: UserRequest = {
            username: generatedUsername,
        };

        const response = await request.put(`${API_URL}/auth/users/me/`, {
            headers: {
                ...authHeaders,
            },
            data: requestBody,
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const user = UserSchema.parse(await response.json());
        expect(user.username).toEqual(generatedUsername);
    });

    test('PATCH', async ({ request }) => {
        const generatedUsername = CredentailsGenerator.generateUsername();

        const requestBody: PatchedUserRequest = {
            username: generatedUsername,
        };

        const response = await request.put(`${API_URL}/auth/users/me/`, {
            headers: {
                ...authHeaders,
            },
            data: requestBody,
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const user = UserSchema.parse(await response.json());
        expect(user.username).toEqual(generatedUsername);
    });

    test.skip('DELETE', async ({ request }) => {
        const response = await request.delete(`${API_URL}/auth/users/me/`);
        expect(response.status()).toEqual(STATUS_CODES.NO_CONTENT);
    });
});
