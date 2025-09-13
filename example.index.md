# Example: Index Mapping Explanation

When you run `GET /playwright-test-index/_mapping` in the Kibana Dev Tools, you receive the mapping of your index. The mapping describes the structure of documents stored in the index, including field names and data types.

## What does the mapping mean?

- **properties**: Lists all fields that documents in this index can have.
- **name**: This field is of type `text` (for full-text search). It also has a subfield `keyword` for exact matches and aggregations.
  - `type: text`: Used for analyzed, full-text search.
  - `fields.keyword`: Used for sorting, aggregations, and exact matches.
- **value**: This field is of type `long` (integer number).

## Where is my document?

The mapping only shows the structure (schema) of documents, not the actual data. Your document (e.g. `{ "name": "Test Document", "value": 42 }`) is stored in the index, but to see the actual document, use:

```
GET /playwright-test-index/_search
```
This will return all documents in the index, including the one you added.

## Example Document

A document matching this mapping could look like:
```
{
  "name": "Test Document",
  "value": 42
}
```

- `name` is a text field (with keyword subfield)
- `value` is a long (integer)

---
**Summary:**
- Mapping = structure/schema
- Document = actual data
- Use `_mapping` to see fields and types
- Use `_search` to see stored documents
