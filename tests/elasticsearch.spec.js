const { test, expect } = require('@playwright/test');
const { createIndex, deleteIndex, addDocument } = require('../src/esActions');

const INDEX_NAME = 'playwright-test-index';

// Create index
test('Create index @Create-index', async () => {
  const res = await createIndex(INDEX_NAME);
  expect(res.ok()).toBeTruthy();
});

// Add document
test('Add document to index @Add-document-to-index', async () => {
  const doc = { name: 'Test Document', value: 42 };
  const res = await addDocument(INDEX_NAME, doc);
  expect(res.ok()).toBeTruthy();
});

// Delete index
test('Delete index @Delete-index', async () => {
  const res = await deleteIndex(INDEX_NAME);
  expect(res.ok()).toBeTruthy();
});
