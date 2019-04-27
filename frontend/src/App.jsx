import React from 'react';
import './App.css';
import PostList from './PostList';
//import PostList2 from './PostList2';
import ContactCardList from './ContactCardList';

export default () => (
  <div>
    <ContactCardList />
    <PostList />
  </div>
);