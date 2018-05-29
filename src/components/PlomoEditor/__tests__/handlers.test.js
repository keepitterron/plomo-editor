import { handleBeforeInput, handleReturn, handleSave, handleTab } from '../handlers';
import { currentBlock, stateFromConfigWithSelection } from '../../../_helpers/test.fixtures';

const event = {
  preventDefault: jest.fn(),
};

describe('handleTab', () => {
  it('does nothing if anchor is not focused', () => {
    const editorState = stateFromConfigWithSelection(undefined, {focusKey: 'foo'});

    const result = handleTab(event, editorState);
    expect(result).toBe(undefined);

  });
  it('does nothing if current block has reached max depth', () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    }
    const editorState = stateFromConfigWithSelection(undefined, {focusKey: 'nuu', anchorKey: 'nuu'});

    const result = handleTab(mockEvent, editorState);
    expect(result).toBe(undefined);
    expect(mockEvent.preventDefault).toHaveBeenCalled();

  });
  it('does nothing if current block is not a list-item', () => {
    const editorState = stateFromConfigWithSelection([{key: 'bar', type: 'custom', text: ''}]);

    const result = handleTab(event, editorState);
    expect(result).toBe(undefined);
  });
  it('does nothing if current block has no list-item parent', () => {
    const editorState = stateFromConfigWithSelection(undefined, {focusKey: 'foo', anchorKey: 'foo'});

    const result = handleTab(event, editorState);
    expect(result).toBe(undefined);

  });
  it('increases current block depth', () => {
    const editorState = stateFromConfigWithSelection();
    const result = handleTab(event, editorState);
    const block = currentBlock(result);

    expect(block.depth).toBe(1);
  })
  it('decreses current block depth with shift+tab', () => {
    const editorState = stateFromConfigWithSelection(undefined, {focusKey: 'baz', anchorKey: 'baz'});
    const result = handleTab({...event, shiftKey: true}, editorState);
    const block = currentBlock(result);

    expect(block.depth).toBe(1);
  })

});

describe('handleReturn', () => {

  it('does nothing for non-empty blocks', () => {
    const editorState = stateFromConfigWithSelection();
    const result = handleReturn(event, {editorState});

    expect(result).toBe(undefined);
  });

  it('decreases block depth of empty list items', () => {
    const editorState = stateFromConfigWithSelection([{key: 'bar', type: 'unordered-list-item', text: '', depth: 2}]);
    const result = handleReturn(event, {editorState});
    const block = currentBlock(result);

    expect(block.depth).toBe(1);
  });

  it('removes styes of current empty list item if depth is 0', () => {
    const editorState = stateFromConfigWithSelection([{key: 'bar', type: 'unordered-list-item', text: ''}]);
    const result = handleReturn(event, {editorState});
    const block = currentBlock(result);

    expect(block.type).toBe('unstyled');
  });

  it('removes styes of current empty block', () => {
    const editorState = stateFromConfigWithSelection([{key: 'bar', type: 'custom', text: ''}]);
    const result = handleReturn(event, {editorState});
    const block = currentBlock(result);

    expect(block.type).toBe('unstyled');
  });
});

describe('handleBeforeInput', () => {
  it('does nothing if no activation string', () => {
    const result = handleBeforeInput('a', {});
    expect(result).toBe(undefined);
  });

  it('does nothing if activation string but no known command', () => {
    const editorState = stateFromConfigWithSelection();
    const result = handleBeforeInput(' ', {editorState});

    expect(result).toBe(undefined);
  });

  it('changes type if activation string and known command', () => {
    const editorState = stateFromConfigWithSelection([{key: 'bar', type: 'custom', text: '#'}]);
    const result = handleBeforeInput(' ', {editorState});
    const block = currentBlock(result);

    expect(block.type).toBe('header-one');
  });
});
