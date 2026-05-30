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