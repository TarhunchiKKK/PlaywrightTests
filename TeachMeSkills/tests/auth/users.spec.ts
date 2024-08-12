import { test, expect } from '@playwright/test';
import { CredentailsGenerator, getTokens } from '../../utils';
import { API_URL, STATUS_CODES } from '../../constants';
import {
    CustomUserCreateRequest,
    CustomUserCreateSchema,
    PaginatedUserListSchema,
    PatchedUserRequest,
    UserRequest,
    UserSchema,
} from '../../types';

let accessToken: string;
const authHeaders = {
    Authorization: '',
};
const userId = 100;

test.describe('/auth/users', () => {
    test.beforeAll(async ({ request }) => {
        [accessToken] = await getTokens(request);
        authHeaders.Authorization = 'Bearer ' + accessToken;
    });

    test('GET', async ({ request }) => {
        const limit = 5;
        const offset = 7;

        const response = await request.get(`${API_URL}/auth/users`, {
            headers: {
                ...authHeaders,
            },
            params: {
                limit,
                offset,
            },
        });
        expect(response.status()).toBe(STATUS_CODES.OK);

        const userList = PaginatedUserListSchema.parse(await response.json());
        expect(userList.result.length).toBe(limit);
    });

    test('POST', async ({ request }) => {
        const requestBody: CustomUserCreateRequest = {
            username: CredentailsGenerator.generateUsername(),
            email: CredentailsGenerator.generateEmail(),
            password: CredentailsGenerator.generatePassword(),
            course_group: 1,
        };

        const response = await request.post(`${API_URL}/auth/users/`, {
            headers: {
                ...authHeaders,
            },
            data: requestBody,
        });
        expect(response.status()).toBe(STATUS_CODES.CREATED);

        const user = CustomUserCreateSchema.parse(await response.json());
        expect(user.email).toEqual(requestBody.email);
        expect(user.username).toEqual(requestBody.username);
    });

    test.describe('/auth/users/{id}/', () => {
        test('GET', async ({ request }) => {
            const response = await request.get(`${API_URL}/auth/users/${userId}`, {
                headers: {
                    ...authHeaders,
                },
            });
            expect(response.status()).toEqual(200);

            const user = UserSchema.parse(await response.json());
            expect(user.id).toEqual(userId);
        });

        test('PUT', async ({ request }) => {
            const generatedUsername = CredentailsGenerator.generateUsername();

            const requestBody: UserRequest = {
                username: generatedUsername,
            };

            const response = await request.put(`${API_URL}/auth/users/${userId}`, {
                headers: {
                    ...authHeaders,
                },
                data: requestBody,
            });
            expect(response.status()).toEqual(STATUS_CODES.OK);

            const user = UserSchema.parse(await response.json());
            expect(user.id).toEqual(userId);
            expect(user.username).toEqual(generatedUsername);
        });

        test('PATCH', async ({ request }) => {
            const generatedUsername = CredentailsGenerator.generateUsername();

            const requestBody: PatchedUserRequest = {
                username: generatedUsername,
            };

            const response = await request.put(`${API_URL}/auth/users/${userId}`, {
                headers: {
                    ...authHeaders,
                },
                data: requestBody,
            });
            expect(response.status()).toEqual(STATUS_CODES.OK);

            const user = UserSchema.parse(await response.json());
            expect(user.id).toEqual(userId);
            expect(user.username).toEqual(generatedUsername);
        });

        test.skip('DELETE', async ({ request }) => {
            const response = await request.delete(`${API_URL}/auth/users/${userId}`);
            expect(response.status()).toEqual(STATUS_CODES.NO_CONTENT);
        });
    });
});
