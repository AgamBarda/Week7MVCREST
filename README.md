# Week 7 Mini Exercise

## Repository Link

https://github.com/AgamBarda/Week7MVCREST.git

> Replace the link above with the real GitHub repository link.

---

# Part 1: Promises

## Question 1

### Code

```javascript
console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve().then(() => {
  console.log(3);
});

console.log(4);
```

### Output

```text
1
4
3
2
```

### Explanation

First, the synchronous code runs immediately, so `1` and `4` are printed first.

The `Promise.resolve().then(...)` callback is added to the microtask queue, so it runs after the synchronous code and prints `3`.

The `setTimeout(..., 0)` callback is added to the macrotask queue, so it runs after the microtasks and prints `2`.

Therefore, the final output is:

```text
1
4
3
2
```

---

## Question 2

### Code

```javascript
setTimeout(() => console.log(1), 0);

Promise.resolve().then(() => {
  console.log(2);

  setTimeout(() => console.log(3), 0);

  Promise.resolve().then(() => {
    console.log(4);
  });
});
```

### Output

```text
2
4
1
3
```

### Explanation

The first `setTimeout` is sent to the macrotask queue.

The `Promise.resolve().then(...)` is sent to the microtask queue, so it runs before the `setTimeout`.

Inside the Promise callback, `2` is printed.

Then another `setTimeout` is created, and another Promise is created.

The inner Promise is also a microtask, so it prints `4` before the timers run.

After all microtasks are finished, the timers run in the order they were created:

First `1`, then `3`.

Therefore, the final output is:

```text
2
4
1
3
```

---

## Question 3

### Code

```javascript
async function demo() {
  console.log(1);

  await Promise.resolve();
  console.log(2);

  await Promise.resolve();
  console.log(3);
}

console.log(4);
demo();
console.log(5);
```

### Output

```text
4
1
5
2
3
```

### Explanation

First, `console.log(4)` runs because it is synchronous.

Then `demo()` is called. Inside `demo`, `console.log(1)` runs immediately.

When the function reaches the first `await`, the rest of the function is paused and moved to the microtask queue.

The outer code continues and prints `5`.

After the synchronous code finishes, the async function continues and prints `2`.

Then it reaches another `await`, pauses again, and continues later to print `3`.

Therefore, the final output is:

```text
4
1
5
2
3
```

---

## Question 4

### Code

```javascript
async function level3() {
  console.log(1);

  await new Promise((resolve, reject) => {
    console.log(2);
    resolve();
  });

  console.log(3);
}

async function level2() {
  console.log(4);
  await level3();
  console.log(5);
}

async function level1() {
  console.log(6);
  await level2();
  console.log(7);
}

level1();
```

### Output

```text
6
4
1
2
3
5
7
```

### Explanation

`level1()` starts and prints `6`.

Then `level1` calls `level2()` with `await`.

`level2()` starts and prints `4`.

Then `level2` calls `level3()` with `await`.

`level3()` starts and prints `1`.

Inside the Promise constructor, the code runs synchronously, so `2` is printed immediately.

After `resolve()` is called, the continuation of `level3` runs as a microtask and prints `3`.

After `level3` finishes, `level2` continues and prints `5`.

After `level2` finishes, `level1` continues and prints `7`.

Therefore, the final output is:

```text
6
4
1
2
3
5
7
```

---

## Question 5

### Code

```javascript
async function level3() {
  console.log(1);

  await new Promise((resolve, reject) => {
    console.log(2);
    resolve();
  });

  console.log(3);
}

async function level2() {
  console.log(4);
  await level3();
  console.log(5);
}

async function level1() {
  console.log(6);
  level2();
  console.log(7);
}

level1();
```

### Output

```text
6
4
1
2
7
3
5
```

### Explanation

`level1()` starts and prints `6`.

Then `level1` calls `level2()`, but without `await`.

`level2()` starts and prints `4`.

Then `level2` calls `level3()` with `await`.

`level3()` starts and prints `1`.

Inside the Promise constructor, `2` is printed immediately.

Because `level1` did not use `await level2()`, it continues immediately and prints `7`.

After the synchronous code finishes, the async continuation of `level3` prints `3`.

Then `level2` continues and prints `5`.

Therefore, the final output is:

```text
6
4
1
2
7
3
5
```

---

# Part 2: MVC

In this part, I implemented the MVC project gradually according to the lecture slides until slide 20.

The project was built step by step:

1. First, I created a simple Express server in `app.js`.
2. Then, I moved the route logic into the `routes` folder.
3. After that, I added a controller inside the `controllers` folder.
4. Then, I added an EJS view inside the `views` folder.
5. After that, I passed data from the controller to the view.
6. Then, I added a model inside the `models` folder.
7. Finally, I connected the route, controller, model, and view together.

---

## MVC Project Structure

```text
Week7MVCREST
│
├── app.js
├── package.json
├── package-lock.json
├── README.md
│
├── controllers
│   └── articles.js
│
├── models
│   └── articles.js
│
├── routes
│   └── articles.js
│
├── views
│   └── article.ejs
│
└── proof
    ├── 1.png
    ├── 2.png
    ├── 3.png
    └── ...
```

---

## MVC Explanation

The MVC architecture separates the application into three main parts:

### Model

The model is responsible for the data and the logic related to the data.

In this project, the model is located in:

```text
models/articles.js
```

The model contains the articles array and functions for getting articles.

### View

The view is responsible for displaying the data to the user.

In this project, the view is located in:

```text
views/article.ejs
```

The view receives data from the controller and displays it as HTML.

### Controller

The controller connects between the route, the model, and the view.

In this project, the controller is located in:

```text
controllers/articles.js
```

The controller receives the request, asks the model for data, and sends the data to the view.

### Routes

The routes define the URLs of the application.

In this project, the routes are located in:

```text
routes/articles.js
```

The route sends the request to the correct controller function.

---

# Part 3: Debugging

I used debugging in VS Code in order to see the MVC structure in action.

I added a breakpoint inside the controller file:

```text
controllers/articles.js
```

The breakpoint was placed near the line that reads the article ID from the request parameters.

When I opened the browser and entered a URL such as:

```text
http://localhost:3000/article/1
```

the program stopped at the breakpoint.

This allowed me to see how the request moves from the browser to the route, then to the controller, then to the model, and finally back to the view.

---

# Part 4: REST API

After completing the MVC part, I changed the project into a RESTful API.

Instead of returning an HTML page using:

```javascript
res.render(...)
```

I returned JSON using:

```javascript
res.json(...)
```

The API supports CRUD operations:

- Create
- Read
- Update
- Delete

---

## REST API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/articles` | Get all articles |
| GET | `/api/articles/:id` | Get one article by ID |
| POST | `/api/articles` | Create a new article |
| PUT | `/api/articles/:id` | Update an article |
| PATCH | `/api/articles/:id` | Partially update an article |
| DELETE | `/api/articles/:id` | Delete an article |

---

# REST API Code Explanation

## app.js

```javascript
const express = require('express');
const app = express();

const articleRoutes = require('./routes/articles');

app.use(express.json());

app.use('/api/articles', articleRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

The file `app.js` creates the Express server.

The line:

```javascript
app.use(express.json());
```

allows the server to read JSON data from the request body.

The line:

```javascript
app.use('/api/articles', articleRoutes);
```

connects the articles routes to the `/api/articles` path.

---

## routes/articles.js

```javascript
const express = require('express');
const router = express.Router();

const controller = require('../controllers/articles');

router
  .route('/')
  .get(controller.getAllArticles)
  .post(controller.createArticle);

router
  .route('/:id')
  .get(controller.getArticleById)
  .put(controller.updateArticle)
  .patch(controller.updateArticle)
  .delete(controller.deleteArticle);

module.exports = router;
```

This file defines the REST routes.

The route `/` supports:

- GET all articles
- POST a new article

The route `/:id` supports:

- GET one article
- PUT update article
- PATCH update article
- DELETE article

---

## controllers/articles.js

```javascript
const Article = require('../models/articles');

exports.getAllArticles = (req, res) => {
  res.json(Article.getAllArticles());
};

exports.getArticleById = (req, res) => {
  const id = parseInt(req.params.id);
  const article = Article.getArticle(id);

  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  res.json(article);
};

exports.createArticle = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content required' });
  }

  const newArticle = Article.createArticle(title, content);

  res
    .status(201)
    .location(`/api/articles/${newArticle.id}`)
    .end();
};

exports.updateArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  const updatedArticle = Article.updateArticle(id, title, content);

  if (!updatedArticle) {
    return res.status(404).json({ error: 'Article not found' });
  }

  res.json(updatedArticle);
};

exports.deleteArticle = (req, res) => {
  const id = parseInt(req.params.id);

  const wasDeleted = Article.deleteArticle(id);

  if (!wasDeleted) {
    return res.status(404).json({ error: 'Article not found' });
  }

  res.status(204).end();
};
```

This file contains the controller functions.

Each function receives a request and sends a response.

For example:

- `getAllArticles` returns all articles.
- `getArticleById` returns one article by ID.
- `createArticle` creates a new article.
- `updateArticle` updates an existing article.
- `deleteArticle` deletes an article.

---

## models/articles.js

```javascript
let idCounter = 3;

let articles = [
  {
    id: 1,
    title: 'My cake',
    author: 'John Doe',
    published: 'February 11, 2024',
    content: 'Lorem ipsum'
  },
  {
    id: 2,
    title: 'Not my cake',
    author: 'Not John Doe',
    published: 'Not February 11, 2024',
    content: 'Not Lorem ipsum'
  }
];

const getAllArticles = () => {
  return articles;
};

const getArticle = (id) => {
  return articles.find(article => article.id === id);
};

const createArticle = (title, content) => {
  const newArticle = {
    id: idCounter++,
    title,
    content
  };

  articles.push(newArticle);
  return newArticle;
};

const updateArticle = (id, title, content) => {
  const article = articles.find(article => article.id === id);

  if (!article) {
    return null;
  }

  if (title !== undefined) {
    article.title = title;
  }

  if (content !== undefined) {
    article.content = content;
  }

  return article;
};

const deleteArticle = (id) => {
  const index = articles.findIndex(article => article.id === id);

  if (index === -1) {
    return false;
  }

  articles.splice(index, 1);
  return true;
};

module.exports = {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
};
```

This file contains the data and the functions that work with the data.

The data is stored in an array called `articles`.

The model supports:

- getting all articles
- getting one article by ID
- creating a new article
- updating an article
- deleting an article

---

# Part 5: REST API Demonstration Using curl

The REST API was tested using `curl`.

Because PowerShell sometimes has problems with JSON inside the command line, I used a JSON file named:

```text
body.json
```

---

## POST Request

### body.json

```json
{
  "title": "hello",
  "content": "world"
}
```

### Command

```powershell
curl.exe -i -X POST "http://localhost:3000/api/articles" -H "Content-Type: application/json" -d "@body.json"
```

### Expected Result

```text
HTTP/1.1 201 Created
Location: /api/articles/3
```

This request creates a new article.

---

## GET All Articles

### Command

```powershell
curl.exe -i "http://localhost:3000/api/articles"
```

### Expected Result

```text
HTTP/1.1 200 OK
Content-Type: application/json
```

The response contains a JSON array with all articles.

---

## GET Article By ID

### Command

```powershell
curl.exe -i "http://localhost:3000/api/articles/1"
```

### Expected Result

```text
HTTP/1.1 200 OK
Content-Type: application/json
```

The response contains the JSON object of article number 1.

---

## PATCH Request

### body.json

```json
{
  "title": "updated hello",
  "content": "updated world"
}
```

### Command

```powershell
curl.exe -i -X PATCH "http://localhost:3000/api/articles/3" -H "Content-Type: application/json" -d "@body.json"
```

### Expected Result

```json
{
  "id": 3,
  "title": "updated hello",
  "content": "updated world"
}
```

This request updates article number 3.

---

## PUT Request

### body.json

```json
{
  "title": "updated hello",
  "content": "updated world"
}
```

### Command

```powershell
curl.exe -i -X PUT "http://localhost:3000/api/articles/3" -H "Content-Type: application/json" -d "@body.json"
```

### Expected Result

```json
{
  "id": 3,
  "title": "updated hello",
  "content": "updated world"
}
```

This request updates article number 3.

---

## DELETE Request

### Command

```powershell
curl.exe -i -X DELETE "http://localhost:3000/api/articles/3"
```

### Expected Result

```text
HTTP/1.1 204 No Content
```

This request deletes article number 3.

---

## GET Deleted Article

### Command

```powershell
curl.exe -i "http://localhost:3000/api/articles/3"
```

### Expected Result

```text
HTTP/1.1 404 Not Found
```

```json
{
  "error": "Article not found"
}
```

This shows that the article was deleted successfully.

---

# Part 6: Summary

In this exercise, I practiced JavaScript Promises, async/await, MVC architecture, debugging, and REST API development.

I first executed and explained different Promise and async/await code examples.

Then, I implemented an Express MVC project gradually according to the lecture slides.

After that, I used debugging to see the MVC flow in action.

Finally, I transformed the MVC project into a RESTful API and tested all CRUD operations using curl.

The project includes documentation screenshots inside the `proof` folder.