import { test, expect } from '@playwright/test';
import { API_URL, AUTH_CREDENTAILS, STATUS_CODES } from '../../constants';
import {
    TokenObtainPairRequest,
    TokenObtainPairSchema,
    TokenRefreshRequest,
    TokenRefreshSchema,
    TokenVerifyRequest,
    TokenVerifyRequestSchema,
} from '../../types';
import { getTokens } from '../../utils';

let accessToken: string;
let refreshToken: string;

test.describe('/auth/jwt/', async () => {
    test.beforeEach(async ({ request }) => {
        [accessToken, refreshToken] = await getTokens(request);
    });

    test('create/', async ({ request }) => {
        const requestBody: TokenObtainPairRequest = {
            email: AUTH_CREDENTAILS.EMAIL,
            password: AUTH_CREDENTAILS.PASSWORD,
        };

        const response = await request.post(`${API_URL}/auth/jwt/create/`, {
            data: requestBody,
        });

        expect(response.status()).toEqual(STATUS_CODES.OK);

        const json = await response.json();

        const { access, refresh } = TokenObtainPairSchema.parse(json);

        expect(access).toBeDefined();
        expect(refresh).toBeDefined();
    });

    test('refresh/', async ({ request }) => {
        const requestBody: TokenRefreshRequest = {
            refresh: refreshToken,
        };

        const response = await request.post(`${API_URL}/auth/jwt/refresh/`, {
            data: requestBody,
        });

        expect(response.status()).toEqual(STATUS_CODES.OK);

        const json = await response.json();

        const { access } = TokenRefreshSchema.parse(json);

        expect(access).toBeDefined();
    });

    test.fixme('verify/', async ({ request }) => {
        const requestBoody: TokenVerifyRequest = {
            token: accessToken,
        };

        const response = await request.post(`${API_URL}/auth/jwt/verify/`, {
            data: requestBoody,
        });

        expect(response.status()).toEqual(STATUS_CODES.OK);

        const json = await response.json();

        console.log(json);

        const { token } = TokenVerifyRequestSchema.parse(json);

        expect(token).toBeDefined();
    });
});
