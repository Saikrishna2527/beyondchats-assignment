import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "16px",
      backgroundColor: "#fafafa"
    }}>
      <h3>{article.title}</h3>

      <p style={{ whiteSpace: "pre-wrap" }}>
        {article.content}
      </p>

      <small>
        <strong>Version:</strong> {article.version}
      </small>
    </div>
  );
};

export default ArticleCard;
