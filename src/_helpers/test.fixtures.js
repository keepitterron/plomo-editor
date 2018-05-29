import { SelectionState, ContentBlock, EditorState, ContentState } from 'draft-js';

const DEFAULT_SELECTED_BLOCK_KEY = 'bar';
const DEFAULT_SELECTION = {
  anchorKey: DEFAULT_SELECTED_BLOCK_KEY,
  anchorOffset: 0,
  focusKey: DEFAULT_SELECTED_BLOCK_KEY,
  focusOffset: 0,
  isBackward: false,
};
const DEFAULT_BLOCK_CONFIG = [
  {key: 'foo', type: 'unordered-list-item', text: 'Foo', depth: 0},
  {key: 'bar', type: 'unordered-list-item', text: 'Bar', depth: 1},
  {key: 'baz', type: 'unordered-list-item', text: 'Baz', depth: 2},
  {key: 'nuu', type: 'unordered-list-item', text: 'Nuu', depth: 4},
];

const makeSelection = (selection = {}) => new SelectionState({...DEFAULT_SELECTION, ...selection});
const stateFromBlockConfig = (config = DEFAULT_BLOCK_CONFIG) => {
  const blockArray = config.map(blockCOnfig => new ContentBlock(blockCOnfig));
  return EditorState.createWithContent(ContentState.createFromBlockArray(blockArray));
};

const blockFromConfig = config => new ContentBlock(config);

const stateFromConfigWithSelection = (config, selection) => EditorState
  .acceptSelection(stateFromBlockConfig(config), makeSelection(selection));

const currentBlock = (editorState) => {
  const content = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const key = selection.getAnchorKey();
  return content.getBlockForKey(key);
};

export { currentBlock, stateFromConfigWithSelection, blockFromConfig, DEFAULT_SELECTED_BLOCK_KEY }
