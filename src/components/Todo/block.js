import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js'
import { Todo, TODO_TYPE } from './index';
import { toggleItem } from './toggler';

function todoBlockComponent(editorState, block, callback) {
  const checked = !!block.getData().get('checked');
  const onToggle = () => {
    const state = toggleItem(editorState, block);
    callback(state);
  }
  const props = { checked, onToggle };

  return { component: Todo, props };
}

const UL = DefaultDraftBlockRenderMap.get('unordered-list-item');
const WRAPPER = UL.wrapper;

const blockRenderMap = Map({
  [TODO_TYPE]: {
    element: 'li',
    wrapper: WRAPPER,
  },
});

export { todoBlockComponent, blockRenderMap, TODO_TYPE }
