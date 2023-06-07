import React, { useEffect, useState, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchArticles,
  selectArticles,
  selectError,
  selectLoading,
} from './newsSlice';
import {selectToken} from "../auth/authSlice";

export function News() {
  const news = useAppSelector(selectArticles);
  const loading = useAppSelector(selectLoading);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles(token));
  }, []);

  if (loading === true) {
    return (
      <div className="article-list-container">
        <ul className="article-list">
          {[...Array(9)].map((_, i) => (
            <li key={i}>
              <div className="image image-skeleton skeleton" />
              <div className="content-container">
                <span className="skeleton-header skeleton" />
                <span className="skeleton-header w-60 skeleton" />
                <span className="skeleton-description skeleton" />
                <span className="skeleton-description skeleton" />
                <span className="skeleton-description w-60 skeleton" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="article-list-container">
      <ul className="article-list">
        {news.map((article) => (
          <li key={article.url}>
            <div className="image">
              <img src={article.urlToImage} alt={article.title} />
            </div>
            <div className="content-container">
              <a href={article.url} target="_blank" className="article-title">
                {article.title}
              </a>
              <p className="article-description">{article.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
