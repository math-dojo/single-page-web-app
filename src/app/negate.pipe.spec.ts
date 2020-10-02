import { NegatePipe } from './negate.pipe';

describe('NegatePipe', () => {
  it('create an instance', () => {
    const pipe = new NegatePipe();
    expect(pipe).toBeTruthy();
  });


  it('should negate the supplied boolen value', () => {
    const pipe = new NegatePipe();
    expect(pipe.transform(true)).toEqual(false);
    expect(pipe.transform(false)).toEqual(true);
  });
});
