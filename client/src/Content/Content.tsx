import React from 'react';
import { Comment, ContentProps } from '../tools/Comment.model';
import './Content.scss';

const Content = ({photo}: ContentProps) => {

    return (
        <section className="content">
              <div className="content__image"><img src={"images/photos/"+photo.source} alt=""/></div>
              <div className="content__title">{photo.title}</div>
              <div className="content__caption">{photo.caption}</div>
              <div className="content__comments">
                  {photo.comments.map((comment: Comment) => {
                      return (
                        <div className="content__commentSubmitted">
                            <div className="content__commentAuthor">Submitted by: {comment.author}</div>
                            <div className="content__commentText">{comment.comment}</div>
                        </div>
                      )
                  })}
              </div>
        </section>
    )
}

export default Content;