# ElasticSearch & Kibana REST API Testing Project

## Introduction

**ElasticSearch** is a powerful, distributed search and analytics engine for all types of data.  
**Kibana** is a visualization tool for ElasticSearch, allowing you to explore, analyze, and visualize your data through a web interface.

**Project Description:**  
This project runs ElasticSearch and Kibana servers locally using Docker. The REST API of ElasticSearch is tested using Playwright, a modern Node.js testing framework. You can interact with ElasticSearch via Kibana’s GUI and validate API endpoints with automated tests.

---

## Table of Contents

- [Dependencies](#dependencies)
  - [Required Tools](#required-tools)
  - [Installation Instructions](#installation-instructions)
- [Running ElasticSearch & Kibana Locally](#running-elasticsearch--kibana-locally)
- [docker-compose.yml Explained](#docker-composeyml-explained)
- [Running Playwright Tests](#running-playwright-tests)
  - [Run All Tests](#run-all-tests)
  - [Run Specific Test Specs](#run-specific-test-specs)
  - [Run Tests by Tag](#run-tests-by-tag)
- [ElasticSearch & Kibana GUI](#elasticsearch--kibana-gui)
  - [Viewing Indices](#viewing-indices)
  - [Viewing Documents](#viewing-documents)
  - [Index Structure Comparison: ElasticSearch vs SQL](#index-structure-comparison-elasticsearch-vs-sql)

---

## Dependencies

### Required Tools

- **Docker Desktop**: To run ElasticSearch and Kibana containers.
- **Node.js**: JavaScript runtime for Playwright and test scripts.
- **Playwright**: For REST API testing.
- **GNU Make** (optional): For convenient command execution.
- **curl** (optional): For manual API requests.

### Installation Instructions

- **Docker Desktop**: [Download & Install](https://www.docker.com/products/docker-desktop/)
- **Node.js**: [Download & Install](https://nodejs.org/)
- **Playwright**: Install via terminal:
  ```powershell
  npm install --save-dev @playwright/test
  npx playwright install
  ```
- **GNU Make (Windows)**:
  - With Chocolatey:  
    `choco install make`
  - Or [Download from SourceForge](https://sourceforge.net/projects/gnuwin32/files/make/3.81/), extract, and add `make.exe` to your PATH.

---

## Running ElasticSearch & Kibana Locally

1. **Start Docker Desktop.**
2. **Run containers:**
   ```powershell
   docker compose up
   ```
   This starts ElasticSearch (default: `localhost:9200`) and Kibana (default: `localhost:5601`).

---

## docker-compose.yml Explained

The `docker-compose.yml` file defines two services:

- **elasticsearch**: Runs the ElasticSearch server.
- **kibana**: Runs the Kibana GUI, connected to ElasticSearch.

Key configuration:
- Sets up networking between services.
- Exposes necessary ports for browser and API access.
- Handles environment variables for basic setup.

---

## Running Playwright Tests

### Run All Tests

```powershell
# Run all Playwright tests
npx playwright test
```

### Run Specific Test Specs

```powershell
# Run a specific test file
npx playwright test tests/elasticsearch.spec.js
```

### Run Tests by Tag

```powershell
# Run only tests with a specific tag, e.g. @Create-index
npx playwright test --grep @Create-index

# Run all tests with @get-indizes tag
npx playwright test --grep @get-indizes
```
_All commands can be run in PowerShell or your terminal._

---

## ElasticSearch & Kibana GUI

### Viewing Indices

- Open Kibana in your browser: [http://localhost:5601](http://localhost:5601)
- Go to **Stack Management > Index Patterns** to create or view index patterns.
- Go to **Stack Monitoring > Elasticsearch > Indices** to see all indices, their health, and stats.

### Viewing Documents

- Go to **Discover** in Kibana.
- Select your index pattern to view documents.
- For mapping and structure, use **Dev Tools**:
  ```json
  GET /your-index/_mapping
  GET /your-index/_search
  ```
  - `_mapping` shows the structure (fields, types).
  - `_search` shows actual documents.

### Index Structure Comparison: ElasticSearch vs SQL

| ElasticSearch Term | SQL Equivalent      | Description                        |
|--------------------|--------------------|------------------------------------|
| Index              | Table              | Collection of documents/rows       |
| Document           | Row                | Single data entry                  |
| Field              | Column             | Attribute of a document/row        |
| Mapping            | Schema/DDL         | Structure definition               |

**Example Mapping Output:**
```json
{
  "your-index": {
    "mappings": {
      "properties": {
        "name": { "type": "text" },
        "value": { "type": "long" }
      }
    }
  }
}
```
**Example Document Output:**
```json
{
  "_source": {
    "name": "Test Document",
    "value": 42
  }
}
```

---

_Use the table of contents above to navigate and set up your project step by step. All commands and explanations are tailored for beginners and advanced users alike._