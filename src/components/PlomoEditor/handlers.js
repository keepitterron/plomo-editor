import { convertToRaw } from 'draft-js';
import { withNewBlockType } from './utils';
import { adjustBlockDepth, removeBlockStyle } from './draft-js';

const ACTIVATION_STRING = ' ';
const MAX_DEPTH = 4;

const isBlockList = block => block && !!block.getType().match(/-list-item/);

function handleSave({ editorState }) {
  const contentState = editorState.getCurrentContent();
  console.log(convertToRaw(contentState));
}

function handleBeforeInput(str, { editorState }) {
  if (str !== ACTIVATION_STRING) return;

  return withNewBlockType(editorState);
}

function handleTab(event, editorState) {
  const selection = editorState.getSelection();
  const key = selection.getAnchorKey();
  const isBlockFocused = key === selection.getFocusKey();
  const content = editorState.getCurrentContent();
  const block = content.getBlockForKey(key);
  const blockAbove = content.getBlockBefore(key);
  const isMaxDepth = !event.shiftKey && block.getDepth() === MAX_DEPTH;

  if(!isBlockFocused || !isBlockList(block) || !isBlockList(blockAbove)) return;

  event.preventDefault();
  if(isMaxDepth) return;

  const maxDepth = Math.min(blockAbove.getDepth() + 1, MAX_DEPTH);
  return adjustBlockDepth(
    editorState,
    event.shiftKey ? -1 : 1,
    maxDepth
  )
}

// TODO: handle shit+enter
function handleReturn(event, { editorState }) {
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) {
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);

    if(!isBlockList(block) && block.getLength() === 0) {
      return removeBlockStyle(editorState);
    }

    if(block.getLength() > 0) return;

    const depth = block.getDepth();
    if (depth === 0) return removeBlockStyle(editorState);
    return adjustBlockDepth(editorState, -1, depth);
  }
  return;
}

export { handleBeforeInput, handleReturn, handleSave, handleTab };
