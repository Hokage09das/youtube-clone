import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  getPopularVideos,
  getVideosByCategory,
} from '../../redux/actions/videos.action';

import './_category_bar.scss';

const keywords = [
  'All',
  'React js',
  'Angular js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art ',
  'Guitar',
  'Bengali Songs',
  'Coding',
  'Cricket',
  'Football',
  'Real Madrid',
  'Gatsby',
  'Poor Coder',
  'Shwetabh',
];

const CategoryBar = () => {
  const [activeElement, setActiveElement] = useState('All');

  const dispatch = useDispatch();

  const handleClick = (value) => {
    setActiveElement(value);
    if (value === 'All') {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };

  return (
    <div className='categories_bar'>
      {keywords.map((word, index) => (
        <span
          key={index}
          onClick={() => handleClick(word)}
          className={activeElement === word ? 'active' : ''}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default CategoryBar;
