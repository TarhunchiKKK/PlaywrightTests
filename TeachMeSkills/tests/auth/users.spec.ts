import { test, expect } from '@playwright/test';
import { getTokens } from '../../utils';
import { API_URL, STATUS_CODES } from '../../constants';
import { CustomUserCreateRequest, CustomUserCreateSchema, PaginatedUserListSchema, UserSchema } from '../../types';
import { generate } from 'randomstring';

let accessToken: string;
let refreshToken: string;

test.describe('/auth/users', () => {
    test.beforeAll(async ({ request }) => {
        [accessToken, refreshToken] = await getTokens(request);
    });

    test('GET', async ({ request }) => {
        const limit = 5;
        const offset = 7;

        const response = await request.get(`${API_URL}/auth/users`, {
            params: {
                limit,
                offset,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.status()).toBe(STATUS_CODES.OK);

        const userList = PaginatedUserListSchema.parse(await response.json());
        expect(userList.result.length).toBe(limit);
    });

    test('POST', async ({ request }) => {
        const requestBody: CustomUserCreateRequest = {
            username: generate({ length: 15, charset: 'alphabetic' }),
            email: generate({ length: 7, charset: 'alphabetic' }) + '@example.com',
            password: generate({ length: 15, charset: 'alphanumeric' }),
            course_group: 1,
        };

        const response = await request.post(`${API_URL}/auth/users/`, {
            data: requestBody,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        expect(response.status()).toBe(STATUS_CODES.CREATED);

        console.log('User:');
        console.log(await response.json());

        const user = CustomUserCreateSchema.parse(await response.json());
        expect(user.email).toEqual(requestBody.email);
        expect(user.username).toEqual(requestBody.username);
    });

    test.describe('/{id}/', () => {
        test('GET', async ({ request }) => {
            const userId = 100;

            const response = await request.get(`${API_URL}/auth/users/${userId}`);
            expect(response.status()).toEqual(200);

            const user = UserSchema.parse(await response.json());
            expect(user.id).toEqual(userId);
        });

        test('POST', async ({ request }) => {});
    });
});
