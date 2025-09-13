const { request } = require('@playwright/test');

const BASE_URL = 'http://localhost:9200';

async function createIndex(index) {
  const context = await request.newContext();
  const res = await context.fetch(`${BASE_URL}/${index}`, { method: 'PUT' });
  await context.dispose();
  return res;
}

async function deleteIndex(index) {
  const context = await request.newContext();
  const res = await context.fetch(`${BASE_URL}/${index}`, { method: 'DELETE' });
  await context.dispose();
  return res;
}

async function addDocument(index, doc) {
  const context = await request.newContext();
  const res = await context.fetch(`${BASE_URL}/${index}/_doc`, {
    method: 'POST',
    data: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  });
  await context.dispose();
  return res;
}

module.exports = { createIndex, deleteIndex, addDocument };