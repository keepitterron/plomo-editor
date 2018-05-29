import React from 'react';
import {
  Editor,
  EditorState,
  DefaultDraftBlockRenderMap,
  RichUtils,
} from 'draft-js';
import { handleBeforeInput, handleReturn, handleSave, handleTab } from './handlers';
import { blockRenderer, blockStyle, blockRenderMap } from './utils';
import { TODO_TYPE, todoBlockComponent } from '../Todo/block';
import { toggleItem } from '../Todo/toggler';

import './index.css';
import '../../../node_modules/draft-js/dist/Draft.css'

export default class PlomoEditor extends React.Component {
  constructor(props) {
    super(props);

    const editorState = EditorState.createEmpty()
    this.state = { editorState };

    this.onChange = (editorState) => {
      this.setState({ editorState });
      return true;
    }
    this.onSave = () => handleSave(this.state);
    this.onTab = this.onTab.bind(this);
    this.handleBeforeInput = this.handleBeforeInput.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.blockRendererFn = this.blockRendererFn.bind(this);
  }

  blockRendererFn(block) {
    if (block.getType() === TODO_TYPE) {
      return todoBlockComponent(this.state.editorState, block, this.onChange);
    }
  }

  componentDidMount() {
    this.refs.editor && this.refs.editor.focus();
  }

  handleBeforeInput(str) {
    const state = handleBeforeInput(str, this.state);
    if(!state) return;

    return this.onChange(state);
  }

  handleReturn(e) {
    const state = handleReturn(e, this.state);
    if(!state) return;

    return this.onChange(state);
  }

  handleKeyCommand(command) {
    const state = RichUtils.handleKeyCommand(this.state.editorState, command);
    if(!state) return;

    return this.onChange(state);
  }

  onTab(e) {
    const state = handleTab(e, this.state.editorState);
    if(!state) return;

    return this.onChange(state);
  }

  render () {
    return (
      <div>
        <button onClick={this.onSave}>save</button>
        <Editor
          ref="editor"
          blockRendererFn={this.blockRendererFn}
          blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
          blockStyleFn={blockStyle}
          editorState={this.state.editorState}
          onChange={this.onChange}
          onTab={this.onTab}
          handleReturn={this.handleReturn}
          handleBeforeInput={this.handleBeforeInput}
          handleKeyCommand={this.handleKeyCommand} />
      </div>);
  }

}
