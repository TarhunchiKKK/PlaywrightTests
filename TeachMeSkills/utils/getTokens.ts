import { APIRequestContext } from '@playwright/test';
import { TokenObtainPairRequest, TokenObtainPairSchema } from '../types';
import { API_URL, AUTH_CREDENTAILS } from '../constants';

export async function getTokens(request: APIRequestContext) {
    const requestBody: TokenObtainPairRequest = {
        email: AUTH_CREDENTAILS.EMAIL,
        password: AUTH_CREDENTAILS.PASSWORD,
    };

    const response = await request.post(`${API_URL}/auth/jwt/create/`, {
        data: requestBody,
    });

    const json = await response.json();

    const { access, refresh } = TokenObtainPairSchema.parse(json);

    return [access, refresh];
}
