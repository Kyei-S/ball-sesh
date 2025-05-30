/**
 * backend/tests/app.test.js
 * @file app.test.js
 * @author Stephen Kyei
 * @purpose API integration tests for the backend Node.js/Express service.
 *          Ensures that health check and session listing endpoints are functioning correctly.
 * @dependencies Jest, Supertest
 */
const request = require('supertest');
const app = require('../src/index');

describe('API Endpoints', () => {
  it('should return status ok on /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  it('should return an array for /sessions', async () => {
    const res = await request(app).get('/sessions');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
