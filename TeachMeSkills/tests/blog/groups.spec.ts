import { test, expect } from '@playwright/test';
import { API_URL, AUTH_CREDENTAILS, STATUS_CODES } from '../../constants';
import { getTokens } from '../../utils';
import { GroupSchema, PaginatedGroupListSchema } from '../../types';

let accessToken: string;
const authHeaders = {
    Authorization: '',
};

test.describe('Post groups tests', () => {
    test.beforeAll(async ({ request }) => {
        [accessToken] = await getTokens(request);
        authHeaders.Authorization = 'Bearer ' + accessToken;
    });

    test('/blog/groups/ GET', async ({ request }) => {
        const limit = 5;
        const offset = 10;

        const response = await request.get(`${API_URL}/blog/groups/`, {
            headers: {
                ...authHeaders,
            },
            params: {
                limit,
                offset,
            },
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const groupList = PaginatedGroupListSchema.parse(await response.json());
        expect(groupList.count).toEqual(limit);
    });

    test('/blog/groups/{id}/ GET', async ({ request }) => {
        const groupId = 10;

        const response = await request.get(`${API_URL}/blog/groups/${groupId}`);
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const group = GroupSchema.parse(await response.json());
        expect(group.id).toEqual(groupId);
    });
});
