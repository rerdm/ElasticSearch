## Creating an Index in ElasticSearch and Viewing It in Kibana

To create a new index in ElasticSearch and view it in Kibana:

1. Make sure your containers are running (`make up` or `docker compose up`).
2. Open a terminal and run the following command to create a sample index:
	```powershell
	curl -X PUT "http://localhost:9200/my-first-index"
	```
	Alternatively, you can use Postman or any REST client to send a PUT request to `http://localhost:9200/my-first-index`.
3. Add some sample data (optional):
	```powershell
	curl -X POST "http://localhost:9200/my-first-index/_doc" -H "Content-Type: application/json" -d "{ \"name\": \"Sample Document\" }"
	```
4. In Kibana, go to **Stack Management > Index Patterns** and create a new index pattern matching `my-first-index`.
5. Go to **Discover** to view and explore your data.

For more details, see the official documentation: [Create an index | ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-create-index.html)

# ElasticSearch & Kibana Locally with Docker

This project demonstrates how to run ElasticSearch and Kibana locally using Docker containers and access them via your browser.

## Prerequisites


## Dependencies

For this project, you will need:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (to run the containers)
- [GNU Make](https://gnuwin32.sourceforge.net/packages/make.htm) or [Chocolatey](https://community.chocolatey.org/packages/make) (optional, for using the Makefile on Windows)

You can also download GNU Make directly from SourceForge:
- [GNU Make 3.81 Download (SourceForge)](https://sourceforge.net/projects/gnuwin32/files/make/3.81/)

After downloading, extract the `make.exe` from the ZIP file and copy it to a folder of your choice. Add this folder to your Windows environment variable `PATH` so you can use `make` in the terminal.

## Steps

1. **Create Docker Compose File**
	 Create a file named `docker-compose.yml` in your project folder with the following content:

	 ```yaml
	 version: '3.7'
	 services:
		 elasticsearch:
			 image: docker.elastic.co/elasticsearch/elasticsearch:8.12.2
			 container_name: elasticsearch
			 environment:
				 - discovery.type=single-node
				 - xpack.security.enabled=false
			 ports:
				 - 9200:9200
			 volumes:
				 - esdata:/usr/share/elasticsearch/data

		 kibana:
			 image: docker.elastic.co/kibana/kibana:8.12.2
			 container_name: kibana
			 environment:
				 - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
			 ports:
				 - 5601:5601
			 depends_on:
				 - elasticsearch

	 volumes:
		 esdata:
	 ```

2. **Start Containers**
	 Open a PowerShell in your project folder and run:
	 ```powershell
	 docker compose up
	 ```

3. **Access via Browser**
	 - ElasticSearch API: [http://localhost:9200](http://localhost:9200)
	 - Kibana UI: [http://localhost:5601](http://localhost:5601)

## Automated API Tests with Playwright

This project uses Playwright to test basic ElasticSearch actions via HTTP API.

### Project Structure

- `src/esActions.js`: Contains helper functions for ElasticSearch API actions (create index, delete index, add document).
- `tests/elasticsearch.spec.js`: Contains Playwright tests that call the helper functions and use expects.

### Example Test

```js
const { test, expect } = require('@playwright/test');
const { createIndex, deleteIndex, addDocument } = require('../src/esActions');

test('Create index', async () => {
  const res = await createIndex('playwright-test-index');
  expect(res.ok()).toBeTruthy();
});
```

### Run Tests

1. Install dependencies:
		```powershell
		npm install
		```

2. Run all Playwright tests:
		```powershell
		npx playwright test
		```

3. Run a single test file:
		```powershell
		npx playwright test tests/elasticsearch.spec.js
		```

4. Run tests by tag:
		- Add tags to your tests using `.describe` or `.test` blocks, e.g. `test.describe('create', ...)` or `test('delete', ...)`
		- Run tests with a specific tag:
			```powershell
			npx playwright test --grep @create
			```
		- Example for a tagged test:
			```js
			test('@create should create index', async () => {
				// ...
			});
			```

## Notes
- The containers will run as long as the terminal is open.
- You can stop the containers with `docker compose down`.
- Data is stored in the `esdata` volume and persists after stopping the containers.

---

Further information: [ElasticSearch Docker Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)
# Elasticsearch & Kibana Cookbook

## Table of Contents
1. [Introduction](#introduction)
	- 1.1 [What is Elasticsearch?](#what-is-elasticsearch)
	- 1.2 [Use Cases](#use-cases)
	- 1.3 [How Elasticsearch Works](#how-elasticsearch-works)
2. [Installation](#installation)
	- 2.1 [Requirements](#requirements)
	- 2.2 [Install Elasticsearch](#install-elasticsearch)
	- 2.3 [Install Kibana](#install-kibana)
	- 2.4 [Running Elasticsearch & Kibana Locally](#running-elasticsearch--kibana-locally)
3. [Basic Usage](#basic-usage)
	- 3.1 [Using Elasticsearch](#using-elasticsearch)
	- 3.2 [Using Kibana](#using-kibana)
4. [Useful Resources](#useful-resources)

---

## Introduction to Elasticsearch

Elasticsearch is a powerful, open-source search and analytics engine designed for horizontal scalability, reliability, and easy management. It is widely used for full-text search, log and event data analysis, and real-time analytics.

## What is Elasticsearch?

Elasticsearch is a distributed, RESTful search and analytics engine built on Apache Lucene. It enables you to store, search, and analyze large volumes of data quickly and in near real-time. It is commonly used for log aggregation, search backends, and business analytics.

## Use Cases
- Full-text search for websites and applications
- Log and event data analysis (e.g., with the ELK stack)
- Business intelligence and analytics
- Security information and event management (SIEM)
- Monitoring and observability

## How Elasticsearch Works

Elasticsearch stores data as JSON documents and indexes them for fast retrieval. It provides a RESTful API for interacting with the data, supporting complex queries, aggregations, and filtering. Data is distributed across nodes in a cluster for scalability and fault tolerance.

## Requirements
- Windows, macOS, or Linux
- Java is bundled with Elasticsearch (no separate installation needed)
- Sufficient RAM (at least 2GB recommended)

## Installation Guide


### Install Elasticsearch
1. Go to the [Elasticsearch downloads page](https://www.elastic.co/downloads/elasticsearch).
2. Download the latest version for your operating system.
3. Extract the archive to your desired location.
4. No license required for basic usage (open-source tier is free).

#### Troubleshooting: Disable HTTPS for Local Access

By default, Elasticsearch may require HTTPS for API access. If you see errors like:
```
received plaintext http traffic on an https channel, closing connection
```
you need to disable HTTPS for local development.

**How to disable HTTPS:**
1. Open the file `elasticsearch.yml` in the `config` folder of your Elasticsearch installation directory.
2. Add or change the following line:
	```yaml
	xpack.security.http.ssl.enabled: false
	```
3. Save the file and restart Elasticsearch.

**What does this change do?**
Setting `xpack.security.http.ssl.enabled: false` disables SSL/TLS encryption for HTTP connections to Elasticsearch. This allows you to access the API using plain HTTP (e.g., `http://localhost:9200`) without certificate or HTTPS errors. This is recommended for local development only. For production, keep HTTPS enabled for secure communication.

### Install Kibana
1. Go to the [Kibana downloads page](https://www.elastic.co/downloads/kibana).
2. Download the latest version for your operating system.
3. Extract the archive to your desired location.
4. Kibana is free for basic usage.

## Running Elasticsearch & Kibana Locally

### Start Elasticsearch
1. Open a terminal or PowerShell window.
2. Navigate to the Elasticsearch folder.
3. Run:
	 ```powershell
	 .\bin\elasticsearch.bat
	 ```
4. Elasticsearch will start on [http://localhost:9200](http://localhost:9200).

### Start Kibana
1. Open a new terminal or PowerShell window.
2. Navigate to the Kibana folder.
3. Run:
	 ```powershell
	 .\bin\kibana.bat
	 ```
4. Kibana will start on [http://localhost:5601](http://localhost:5601).

## Basic Usage

### Using Elasticsearch
- Interact with Elasticsearch using REST API tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).
- Example: Index a document
	```powershell
	curl -X POST "localhost:9200/my-index/_doc/1" -H 'Content-Type: application/json' -d '{"title": "Hello World", "content": "This is a test document."}'
	```
- Example: Search for documents
	```powershell
	curl -X GET "localhost:9200/my-index/_search?q=title:Hello"
	```

### Using Kibana
- Open [http://localhost:5601](http://localhost:5601) in your browser.
- Use the "Dev Tools" console to run Elasticsearch queries interactively.
- Visualize your data with dashboards and charts.

## Useful Resources
- [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Kibana Documentation](https://www.elastic.co/guide/en/kibana/current/index.html)
- [ELK Stack Overview](https://www.elastic.co/what-is/elk-stack)