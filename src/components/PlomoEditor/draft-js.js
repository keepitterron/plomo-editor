import { EditorState, RichUtils } from 'draft-js'
import adjustBlockDepthForContentState from 'draft-js/lib/adjustBlockDepthForContentState'

function adjustBlockDepth(
  editorState,
  adjustment,
  maxDepth
) {
  const content = adjustBlockDepthForContentState(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    adjustment,
    maxDepth
  )

  return EditorState.push(editorState, content, 'adjust-depth')
}

function removeBlockStyle(editorState) {
  const withoutBlockStyle = RichUtils.tryToRemoveBlockStyle(editorState)
  if (withoutBlockStyle) {
    return EditorState.push(
      editorState,
      withoutBlockStyle,
      'change-block-type'
    )
  }
  return editorState
}

function getSelectedBlocksMap(editorState) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const blockMap = contentState.getBlockMap();
  return blockMap
    .toSeq()
    .skipUntil((_, k) => k === startKey)
    .takeUntil((_, k) => k === endKey)
    .concat([[endKey, blockMap.get(endKey)]]);
}

function getSelectedBlocksList(editorState) {
  return getSelectedBlocksMap(editorState).toList();
}

function getSelectedBlock(editorState) {
  if (editorState) {
    return getSelectedBlocksList(editorState).get(0);
  }
  return;
}

export { adjustBlockDepth, removeBlockStyle, getSelectedBlock }
