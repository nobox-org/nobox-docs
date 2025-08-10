---
title: Call AI Models (OpenAI-Compatible API)
description: Access 300+ AI models through our OpenAI-compatible API endpoint. Drop-in replacement for OpenAI API calls.
---

## Overview

Nobox provides access to **300+ AI models** from providers like OpenAI, Anthropic, Google, and Meta through a single, **OpenAI-compatible API endpoint**. 

### Chat Completions Endpoint

- Method: POST
- Path: `/_f_/v1/chat/completions`
- Base URL: `https://api.nobox.cloud`

#### Required headers

- `Authorization`: `Bearer <user-token>`
- `Content-Type`: `application/json`

#### Request body

```ts
{
  model: string;                    // model id or public_id
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string | Array<{
      type: 'text' | 'image_url' | 'input_audio';
      text?: string;
      image_url?: { url: string };
      input_audio?: { data: string; format: string };
    }>;
  }>;
  temperature?: number;             // 0-2, default varies by model
  max_tokens?: number;              // maximum tokens to generate
  stream?: boolean;                 // enable streaming responses
}
```

#### Response format

```ts
{
  id: string;                       // completion id
  object: "chat.completion";
  created: number;                  // unix timestamp
  model: string;                    // model used
  choices: Array<{
    index: number;
    message: {
      role: "assistant";
      content: string;
    };
    finish_reason: "stop" | "length" | "content_filter";
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
```

## Examples

### JavaScript with OpenAI Client

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.nobox.cloud/_f_/v1',
  apiKey: 'your-nobox-user-token'
});

const response = await client.chat.completions.create({
  model: 'gpt-4o', // or claude-3.5-sonnet, gemini-pro, llama-3.3-70b
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain quantum computing in simple terms.' }
  ],
  temperature: 0.7,
  max_tokens: 150
});

console.log(response.choices[0].message.content);
```

### Python with OpenAI Client

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.nobox.cloud/_f_/v1",
    api_key="your-nobox-user-token"
)

response = client.chat.completions.create(
    model="anthropic/claude-3.5-sonnet",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write a haiku about programming"}
    ],
    temperature=0.7,
    max_tokens=150
)

print(response.choices[0].message.content)
```

### Direct HTTP Request

```javascript
const response = await fetch('https://api.nobox.cloud/_f_/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-nobox-user-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'google/gemini-pro',
    messages: [
      { role: 'user', content: 'What are the benefits of renewable energy?' }
    ],
    temperature: 0.5,
    max_tokens: 200
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

### Streaming Response

```javascript
const response = await fetch('https://api.nobox.cloud/_f_/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-nobox-user-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'meta/llama-3.3-70b',
    messages: [{ role: 'user', content: 'Tell me a story about space exploration' }],
    stream: true
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') return;
      
      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) process.stdout.write(content);
      } catch (e) {
        // Skip invalid JSON
      }
    }
  }
}
```

## Available Models

Access **300+ models** from top providers:

| Provider | Popular Models | Model IDs |
|----------|----------------|-----------|
| **OpenAI** | GPT-4o, GPT-4.1, o1, o3 | `gpt-4o`, `gpt-4-turbo`, `o1-preview` |
| **Anthropic** | Claude 3.5 Sonnet, Claude 4 | `anthropic/claude-3.5-sonnet`, `anthropic/claude-4` |
| **Google** | Gemini Pro, Gemini Flash | `google/gemini-pro`, `google/gemini-flash` |
| **Meta** | Llama 3.3 70B, Llama 4 | `meta/llama-3.3-70b`, `meta/llama-4` |
| **DeepSeek** | DeepSeek R1, DeepSeek V3 | `deepseek/deepseek-r1`, `deepseek/deepseek-v3` |

[**View All 300+ Models →**](/allowed-models)

## List Available Models

Get the complete list of models available to your account:

```javascript
const response = await fetch('https://api.nobox.cloud/_f_/models', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-nobox-user-token',
    'Content-Type': 'application/json'
  }
});

const { data: models } = await response.json();
// Each model includes fields like id, public_id, name, pricing, etc.
console.log(models);
```

## Error Handling

Common error responses:

- **400**: Insufficient funds in wallet
- **401**: Invalid or missing authorization token  
- **404**: Model not found
- **429**: Rate limit exceeded
- **500**: Provider or internal server error

Example error response:
```json
{
  "error": {
    "type": "insufficient_funds",
    "message": "Insufficient wallet balance to complete this request"
  }
}
```

## Next Steps

- **[View All Models](/allowed-models)** - Browse the complete catalog of 300+ AI models
- **[Get Started](https://dashboard.nobox.cloud)** - Create account and get your API token
- **[Database Operations](/install-nobox)** - Add backend capabilities to your AI apps
