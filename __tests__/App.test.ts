import { fromApp } from '@root/app';

describe('greeter function', () => {
  it('A valid message should return from promise method', async () => {
    const result = await fromApp();
    expect(typeof result).toBe('string');
    expect(result).toEqual('message from app');
  });
});
