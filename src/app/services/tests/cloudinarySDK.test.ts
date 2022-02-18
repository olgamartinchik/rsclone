import CloudinaryManager from '../cloudinarySDK'

test("Should return string",()=>{
    const result = new CloudinaryManager().getVideoUrl('something')
    expect(typeof result).toBe("string")
})