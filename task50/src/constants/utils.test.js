import * as utils from './utils';
describe('test utils function', () => {
  test('unique id', () => {
    const uuid = utils.guid();
    expect(uuid).toMatch(/[\-]\w{4,12}/);
  });
});
