import { TOGGLING_STATE, blockShouldToggle, toggleBlock, toggleItem } from '../toggler';
import { currentBlock, stateFromConfigWithSelection, blockFromConfig, DEFAULT_SELECTED_BLOCK_KEY } from '../../../_helpers/test.fixtures';

describe('toggleItem', () => {
  it('toggles the current item', () => {
    const blocksConfig = [{key: DEFAULT_SELECTED_BLOCK_KEY, type: 'foo'}];
    const editorState = stateFromConfigWithSelection(blocksConfig);
    const toggleBlock = currentBlock(editorState);

    const result = toggleItem(editorState, toggleBlock);
    const block = currentBlock(result);
    const checked = block.getData().get('checked');

    expect(checked).toBe(true);
  });

  it('toggles current item and children', () => {
    const blocksConfig = [
      {key: 'foo', type: 'item'},
      {key: 'bar', type: 'item'},
      {key: 'baz', type: 'item', depth: 1},
      {key: 'qix', type: 'item', depth: 1},
      {key: 'zap', type: 'item'},
    ];
    const editorState = stateFromConfigWithSelection(blocksConfig);
    const blockToToggle = currentBlock(editorState);

    const result = toggleItem(editorState, blockToToggle);
    const contentState = result.getCurrentContent();
    expect(isChecked(contentState, 'foo')).toBe(false);
    expect(isChecked(contentState, 'bar')).toBe(true);
    expect(isChecked(contentState, 'baz')).toBe(true);
    expect(isChecked(contentState, 'qix')).toBe(true);
    expect(isChecked(contentState, 'zap')).toBe(false);
  });

  it('toggles current item, children and grandchildren', () => {
    const blocksConfig = [
      {key: 'bar', type: 'item'},
      {key: 'baz', type: 'item', depth: 1},
      {key: 'qix', type: 'item', depth: 2},
      {key: 'zap', type: 'item', depth: 2},
    ];
    const editorState = stateFromConfigWithSelection(blocksConfig);
    const blockToToggle = currentBlock(editorState);

    const result = toggleItem(editorState, blockToToggle);
    const contentState = result.getCurrentContent();
    expect(isChecked(contentState, 'qix')).toBe(true);
    expect(isChecked(contentState, 'zap')).toBe(true);
  });
});

function isChecked(contentState, key) {
  const block = contentState.getBlockForKey(key);
  const data = block.getData();
  return data.has('checked') && data.get('checked');
}
