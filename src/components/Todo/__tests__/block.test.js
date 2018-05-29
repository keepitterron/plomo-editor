import { todoBlockComponent, TODO_TYPE } from '../block';
import { currentBlock, stateFromConfigWithSelection, DEFAULT_SELECTED_BLOCK_KEY } from '../../../_helpers/test.fixtures';

describe('todoBlockComponent', () => {
  it('returns the correct props', () => {
    const blockData = {key: DEFAULT_SELECTED_BLOCK_KEY, type: TODO_TYPE};
    const editorState = stateFromConfigWithSelection(
      [blockData]
    );
    const block = currentBlock(editorState);
    const result = todoBlockComponent(editorState, block);

    expect(result.props.checked).toBe(false);
    expect(result.props.onToggle).toBeDefined();
  });

  it('calls a function on toggle', () => {
    const blockData = {key: DEFAULT_SELECTED_BLOCK_KEY, type: TODO_TYPE};
    const editorState = stateFromConfigWithSelection(
      [blockData]
    );
    const block = currentBlock(editorState);
    const callback = jest.fn();
    const result = todoBlockComponent(editorState, block, callback);

    result.props.onToggle();
    expect(callback).toHaveBeenCalled();
  });
});
