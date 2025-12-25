Project Overview

This project implements an end-to-end content pipeline for BeyondChats:

Phase-1: Scrape blog articles

Phase-2: Rewrite latest article using an LLM (with fallback)

Phase-3: Display the rewritten article on a frontend UI

Architecture:

Scraper (Laravel Command)
        ↓
Database (SQLite)
        ↓
LLM Rewrite (Node.js)
        ↓
Laravel API
        ↓
React Frontend

Repository Structure:

backend/      → Laravel backend (API + scraping)
llm-script/   → Node.js LLM rewrite script
frontend/     → React UI


Phase-1: Scraping

Implemented as a Laravel console command

Scrapes blog title & content

Stores articles in SQLite

Prevents duplicates


Phase-2: LLM Rewrite

Node.js script fetches latest article

Attempts rewrite via OpenAI API

Handles:

Invalid API key (401)

Quota exceeded (429)

Gracefully falls back to mock rewrite


hase-3: Frontend Display

React app fetches /api/articles/latest

Displays:

Article title

Rewritten content

Clean, minimal UI

Key API Endpoint:
GET /api/articles/latest

OpenAI API Note:

Due to OpenAI account limitations: Live LLM calls may not execute

The system automatically switches to a mock rewrite.


Final Output

The UI displays the latest rewritten article, confirming full pipeline execution.
