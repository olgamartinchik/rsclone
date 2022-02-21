import CloudinaryManager from '../cloudinarySDK';

test('Should return string', () => {
    const result = new CloudinaryManager().getVideoUrl('something');
    expect(typeof result).toBe('string');
    expect(result).not.toBeFalsy();
});
test('Should return not number or object', () => {
    const result = new CloudinaryManager().getVideoUrl('something');
    expect(typeof result).not.toBe('number');
    expect(typeof result).not.toBe('object');
});
