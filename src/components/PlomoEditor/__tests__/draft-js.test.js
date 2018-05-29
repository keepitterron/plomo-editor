import { adjustBlockDepth, removeBlockStyle, getSelectedBlock } from '../draft-js';
import { currentBlock, stateFromConfigWithSelection, DEFAULT_SELECTED_BLOCK_KEY } from '../../../_helpers/test.fixtures';

describe('adjustBlockDepth', () => {
  it('increases depth of current block', () => {
    const editorState = stateFromConfigWithSelection(
      [{key: DEFAULT_SELECTED_BLOCK_KEY, type: 'custom', depth: 0}]
    );
    const result = adjustBlockDepth(editorState, 1, 2);
    const block = currentBlock(result);

    expect(block.depth).toBe(1);
  });

  it('decreases depth of current block', () => {
    const editorState = stateFromConfigWithSelection(
      [{key: DEFAULT_SELECTED_BLOCK_KEY, type: 'custom', depth: 2}]
    );
    const result = adjustBlockDepth(editorState, -1, 2);
    const block = currentBlock(result);

    expect(block.depth).toBe(1);
  });

  it('does nothing when maxDepth is reached', () => {
    const editorState = stateFromConfigWithSelection(
      [{key: DEFAULT_SELECTED_BLOCK_KEY, type: 'custom', depth: 2}]
    );
    const result = adjustBlockDepth(editorState, 1, 2);
    const block = currentBlock(result);

    expect(block.depth).toBe(2);
  });
});

describe('removeBlockStyle', () => {
  it('removes the current block style', () => {
    const editorState = stateFromConfigWithSelection(
      [{key: DEFAULT_SELECTED_BLOCK_KEY, type: 'custom', depth: 2}]
    );
    const result = removeBlockStyle(editorState);
    const block = currentBlock(result);

    expect(block.type).toBe('unstyled');
  });
});

describe('getSelectedBlock', () => {
  it('gets the currently selected block', () => {
    const editorState = stateFromConfigWithSelection();
    const currentBlock = getSelectedBlock(editorState);

    expect(currentBlock.key).toBe(DEFAULT_SELECTED_BLOCK_KEY);
  });
});
