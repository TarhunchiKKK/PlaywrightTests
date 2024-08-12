import { test, expect } from '@playwright/test';
import { getTokens } from '../../utils';
import { API_URL, STATUS_CODES } from '../../constants';
import { UserSchema } from '../../types';

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
        const response = await request.get(`${API_URL}/auth/users`, {
            headers: {
                ...authHeaders,
            },
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const user = UserSchema.parse(await response.json());
        expect(user.id).toBeDefined();
    });
});
