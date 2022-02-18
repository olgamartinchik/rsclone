import Utils from "../utils";


test('Should return number`',()=>{
    expect(Utils.getMonth('Jan')).toBe(0)
    expect(Utils.getMonth('Feb')).toBe(1)
    expect(Utils.getMonth('Mar')).toBe(2)
    expect(Utils.getMonth('Apr')).toBe(3)
    expect(Utils.getMonth('May')).toBe(4)
    expect(Utils.getMonth('Jun')).toBe(5)
    expect(Utils.getMonth('Jul')).toBe(6)
    expect(Utils.getMonth('Aug')).toBe(7)
    expect(Utils.getMonth('Sep')).toBe(8)
    expect(Utils.getMonth('Oct')).toBe(9)
    expect(Utils.getMonth('Nov')).toBe(10)
    expect(Utils.getMonth('Dec')).toBe(11)
    const resultMonth=Utils.getMonth('Mar')
    const targe=10
    expect(resultMonth).toBeLessThan(targe)

})

test('Should return randomInteger typeof number',()=>{
    const result=Utils.randomInteger(1,200)
    expect(typeof result).toBe('number')

})
test('Should return randomInteger typeof boolean',()=>{
    const result=Utils.compareObjects({},{})
    expect(typeof result).toBe('boolean')

})

test('Should return array',()=>{
    const result=Utils.shuffleArr([])    
    expect(result).toEqual([])

})
test('Should return string',()=>{
    const result=Utils.getTime(216000)    
    expect(typeof result).toEqual('string')
    expect(result).not.toBeFalsy()

})