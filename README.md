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