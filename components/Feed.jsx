"use client";

import {useState, useEffect} from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className = "mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick = {handleTagClick}
        />
      ))} 
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [showPosts, setShowPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);  
  
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
    setShowPosts(data);
    console.log("fetched");
  } 
 

  const filterTag = (data, search) => {
    return data.filter((post) => {
      return post.tag.substring(1,search.length) == search.substring(1);
    });
  }

  const filterUsername = (data, search) => {
    console.log("fitlering using: ", search.substring(1));
    return data.filter((post) => {
      return post.creator.username.substring(0,search.length-1) == search.substring(1);
    });
  }

  const filterText = (data,search) => {
    console.log("fitlering using: ", search);
    return data.filter((post) => post.prompt.includes(search));
  }

  const searchChanged = (search) => {
    console.log("test: ", search);
    if (!searchText) {
      return allPosts;
    }
    else {
      if (search.charAt(0) == "#") return (filterTag(allPosts, search));
      else if (search.charAt(0) == "@") return (filterUsername(allPosts, search));
      else return (filterText(allPosts,search));
    }
  
  }

  const tagClicked = (tagText) => {
    setSearchText(tagText);
    setShowPosts(searchChanged(tagText));
  
  }

  const handleSearchChange = (e) => {
    console.log("changed to: ",  e.target.value);
    //clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setShowPosts(searchChanged(e.target.value));
    //setSearchTimeout(setTimeout(() => setShowPosts(searchChanged(e.target.value)),500));
  }; 


  useEffect( () => {
   fetchPosts(); 
  }, []);

  return (
    <section className = "feed">
      <form className = "relative w-full flex-center">
        <input type = "text" placeholder = "Search for a #hashtag, @username, or prompt" value = {searchText}
               onChange = {handleSearchChange} required className = "search_input peer" />
      </form>

      <PromptCardList 
        data={showPosts}
        handleTagClick= {tagClicked}
      />
    </section>

  )
}

export default Feed;
