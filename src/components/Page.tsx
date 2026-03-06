import React from "react";

interface PageProps {
  title: string;
}

const Page: React.FC<PageProps> = ({ title }) => {
  return (
    <div className="page-content">
      <h1>{title}</h1>
      <p>Вы находитесь на странице «{title}».</p>
    </div>
  );
};

export default Page;
