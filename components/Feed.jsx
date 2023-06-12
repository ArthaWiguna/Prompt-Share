"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard handleTagClick={handleTagClick} key={post.id} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // search state
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const result = filterPrompts(e.target.value);
    setSearchResults(result);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList handleTagClick={handleTagClick} data={searchResults} />
      ) : (
        <PromptCardList handleTagClick={handleTagClick} data={posts} />
      )}
    </section>
  );
};

export default Feed;
