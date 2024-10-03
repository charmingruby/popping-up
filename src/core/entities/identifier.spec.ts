import { Identifier } from './identifier';

describe('[CORE] Identifier', () => {
  it('should be able to create an identifier without value', () => {
    const id = new Identifier();

    expect(id.toString).toBeDefined();
    expect(id.toString.length).toBeGreaterThan(4);
  });

  it('should be able to create an identifier with value', () => {
    const value = 'id';

    const id = new Identifier(value);

    expect(id.toString).toBeDefined();
    expect(id.toString).toEqual(value);
  });
});
