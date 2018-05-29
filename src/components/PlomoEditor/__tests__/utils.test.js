import { BLOCK_TYPES, blockStyle, withNewBlockType } from '../utils';
import { currentBlock, stateFromConfigWithSelection, blockFromConfig } from '../../../_helpers/test.fixtures';

describe('blockStyle', () => {
  it('returns the todo css class', () => {
    const block = blockFromConfig({type: BLOCK_TYPES.TODO});
    const result = blockStyle(block);
    expect(result).toBe(BLOCK_TYPES.TODO);
  });

  it('does nothing', () => {
    const block = blockFromConfig({type: 'custom'});
    const result = blockStyle(block);
    expect(result).toBe(undefined);
  });
});

describe('withNewBlockType', () => {
  it('updates type by text command', () => {
    const editorState = stateFromConfigWithSelection(
      [{key: 'bar', type: 'custom', text: '##'}]
    );
    const result = withNewBlockType(editorState);
    const block = currentBlock(result);
    expect(block.type).toBe(BLOCK_TYPES.H2);
  });

  it('does nothing if no known command', () => {
    const editorState = stateFromConfigWithSelection();
    const result = withNewBlockType(editorState);

    expect(result).toBe(undefined);
  });
});
