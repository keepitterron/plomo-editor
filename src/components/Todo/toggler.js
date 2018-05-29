import { EditorState } from 'draft-js';

const mergeBlockDataByKey = (editorState, blockKey, data) => {
  const content = editorState.getCurrentContent()
  const updatedBlock = content.getBlockForKey(blockKey).mergeIn(['data'], data)
  const blockMap = content.getBlockMap().merge({ [blockKey]: updatedBlock })
  return EditorState.push(editorState, content.merge({ blockMap }), 'change-block-data')
}

let status;
const TOGGLING_STATE = {
  DONE: 'done',
  DOING: 'doing',
};

function blockShouldToggle(parentBlock, currentBlock) {
  if(status === TOGGLING_STATE.DONE) return;
  if(status && currentBlock.getType() !== parentBlock.getType()) status = TOGGLING_STATE.DONE;
  if(status && currentBlock.getDepth() <= parentBlock.getDepth()) status = TOGGLING_STATE.DONE;
  if(currentBlock.getKey() === parentBlock.getKey()) status = TOGGLING_STATE.DOING;
  if(status !== TOGGLING_STATE.DOING) return;

  return currentBlock;
}

function toggleBlock(parentBlock, editorState, currentBlock) {
  const checked = !parentBlock.getData().get('checked');
  return mergeBlockDataByKey(editorState, currentBlock.getKey(), { checked });
}

function toggleItem(editorState, block) {
  let content = editorState.getCurrentContent();
  status = null;
  return content.getBlockMap()
    .map(blockShouldToggle.bind(null, block))
    .filter(block => block)
    .reduce(toggleBlock.bind(null, block), editorState);
}

export { TOGGLING_STATE, blockShouldToggle, toggleBlock, toggleItem }
