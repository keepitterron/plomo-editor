
import React, { Component } from 'react';
import { EditorBlock } from 'draft-js';
import './index.css';

export const TODO_TYPE = 'todo-list-item';

export class Todo extends Component {
  render() {
    const { offsetKey, blockProps: { onToggle, checked } } = this.props;
    return (
      <div
        className={`${TODO_TYPE}__container${checked ? ' is-checked' : ''}`}
        data-offset-key={offsetKey}
      >
        <div
          className={`${TODO_TYPE}__checkbox`}
          contentEditable={false}
          suppressContentEditableWarning
        >
          <input type='checkbox' checked={checked} onChange={onToggle} />
        </div>
        <div className={`${TODO_TYPE}__text`}>
          <EditorBlock {...this.props} />
        </div>
      </div>
    )
  }
}
