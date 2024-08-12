import { test, expect } from '@playwright/test';
import { API_URL, AUTH_CREDENTAILS, STATUS_CODES } from '../../constants';
import { getTokens } from '../../utils';
import { PaginatedPostListSchema, PostRequest, PostSchema } from '../../types';

let accessToken: string;
const authHeaders = {
    Authorization: '',
};
const postId = 50;

test.describe('Posts tests', () => {
    test.beforeAll(async ({ request }) => {
        [accessToken] = await getTokens(request);
        authHeaders.Authorization = 'Bearer ' + accessToken;
    });

    test('/blog/posts/ GET', async ({ request }) => {
        const limit = 5;
        const offset = 10;

        const response = await request.get(`${API_URL}/blog/posts/`, {
            headers: {
                ...authHeaders,
            },
            params: {
                limit,
                offset,
            },
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const postList = PaginatedPostListSchema.parse(await response.json());
        expect(postList.results.length).toEqual(limit);
    });

    test('/blog/posts/ POST', async ({ request }) => {
        const requestBody = {
            description: 'Test desctiption',
            image: 'https://test.com',
            text: 'Test text',
            title: 'Test title',
            lesson_num: 5,
        };

        const response = await request.post(`${API_URL}/blog/posts/`, {
            headers: {
                ...authHeaders,
            },
            data: requestBody,
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const post = PostSchema.parse(await response.json());
        expect(post.title).toEqual(requestBody.title);
        expect(post.text).toEqual(requestBody.text);
        expect(post.description).toEqual(requestBody.description);
        expect(post.image).toEqual(requestBody.image);
    });

    test('/blog/posts/{id}/ GET', async ({ request }) => {
        const response = await request.get(`${API_URL}/blog/posts/${postId}/`, {
            headers: {
                ...authHeaders,
            },
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const post = PostSchema.parse(await response.json());
        expect(post.id).toEqual(postId);
    });

    test('/blog/posts/{id}/ PUT', async ({ request }) => {
        const requestBody: PostRequest = {
            description: 'Test desctiption',
            image: 'https://test.com',
            text: 'Test text',
            title: 'Test title',
            lesson_num: 5,
            author: 5,
            date: Date.now().toString(),
        };

        const response = await request.put(`${API_URL}/blog/posts/${postId}/`, {
            headers: {
                ...authHeaders,
            },
            data: requestBody,
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const post = PostSchema.parse(await response.json());
        expect(post.id).toEqual(postId);
        expect(post.title).toEqual(requestBody.title);
        expect(post.text).toEqual(requestBody.text);
        expect(post.description).toEqual(requestBody.description);
        expect(post.image).toEqual(requestBody.image);
        expect(post.author).toEqual(requestBody.author);
        expect(post.date).toEqual(requestBody.date);
    });

    test('/blog/posts/{id}/ PATCH', async ({ request }) => {
        const requestBody: PostRequest = {
            description: 'Test desctiption',
            image: 'https://test.com',
            text: 'Test text',
            title: 'Test title',
            lesson_num: 5,
            author: 5,
            date: Date.now().toString(),
        };

        const response = await request.patch(`${API_URL}/blog/posts/${postId}/`, {
            headers: {
                ...authHeaders,
            },
            data: requestBody,
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);

        const post = PostSchema.parse(await response.json());
        expect(post.id).toEqual(postId);
        expect(post.title).toEqual(requestBody.title);
        expect(post.text).toEqual(requestBody.text);
        expect(post.description).toEqual(requestBody.description);
        expect(post.image).toEqual(requestBody.image);
        expect(post.author).toEqual(requestBody.author);
        expect(post.date).toEqual(requestBody.date);
    });

    test('/blog/posts/{id}/ DELETE', async ({ request }) => {
        const response = await request.delete(`${API_URL}/blog/posts/${postId}/`, {
            headers: {
                ...authHeaders,
            },
        });
        expect(response.status()).toEqual(STATUS_CODES.OK);
    });
});
