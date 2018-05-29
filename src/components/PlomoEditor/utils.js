import { EditorState } from 'draft-js';
import { todoBlockComponent, TODO_TYPE, blockRenderMap } from '../Todo/block';
import { getSelectedBlock } from './draft-js';

const BLOCK_TYPES = {
  UL: 'unordered-list-item',
  OL: 'ordered-list-item',
  UNSTYLED: 'unstyled',
  BLOCKQUOTE: 'blockquote',
  TODO: TODO_TYPE,
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
}

// TODO: use regexp to return eventual string
// after activation char sequence
function textToType(blockText) {
  if(blockText === '[]') return BLOCK_TYPES.TODO;
  if(blockText === '-') return BLOCK_TYPES.UL;
  if(blockText === '1.') return BLOCK_TYPES.OL;
  if(blockText === '>') return BLOCK_TYPES.BLOCKQUOTE;
  if(blockText === '#') return BLOCK_TYPES.H1;
  if(blockText === '##') return BLOCK_TYPES.H2;
  if(blockText === '###') return BLOCK_TYPES.H3;
  return null;
}

function withNewBlockType(editorState) {
  const currentBlock = getSelectedBlock(editorState);
  const blockText = currentBlock.getText();
  const type = textToType(blockText);
  if(!type) return;

  return resetBlockType(editorState, currentBlock.merge({type, text: ''}));
}

function resetSelection(editorState) {
  return editorState
  .getSelection()
  .merge({ anchorOffset: 0, focusOffset: 0 });
};

function addBlockToMap(contentState, block) {
  return contentState
    .getBlockMap()
    .set(block.key, block);
}

function resetBlockType(editorState, block) {
  const contentState = editorState.getCurrentContent();
  const selectionAfter = resetSelection(editorState);
  const blockMap = addBlockToMap(contentState, block);

  return EditorState.push(
    editorState,
    contentState.merge({blockMap, selectionAfter}),
    'change-block-type'
  );
};

function blockStyle(block) {
  if (block.getType() === BLOCK_TYPES.TODO) return BLOCK_TYPES.TODO;
}

export { BLOCK_TYPES, blockRenderMap, blockStyle, withNewBlockType }
