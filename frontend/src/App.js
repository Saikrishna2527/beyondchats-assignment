import { useEffect, useState } from "react";
import ArticleCard from "./components/ArticleCard";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/articles/latest")
      .then(res => res.json())
      .then(data => setArticles(data ? [data] : []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>BeyondChats Articles</h1>
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default App;
