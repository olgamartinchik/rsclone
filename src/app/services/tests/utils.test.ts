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
test('Should not return Date', ()=>{
    const resultMonth=Utils.getMonth('Dec')
    const targe=new Date()
    expect(resultMonth).not.toEqual(targe)
})

describe('Should return randomInteger',()=>{
    test('typeof number',()=>{
        const result=Utils.randomInteger(1, 200)
        expect(typeof result).toBe('number')

    })
    test('typeof number',()=>{
        const result=Utils.randomInteger(1, 100)
        expect(result).not.toBe(undefined)

    })
   
  
    
})


test('should return typeof boolean',()=>{
    const result=Utils.compareObjects({},{})
    expect(typeof result).toBe('boolean')

})

test('Should return array',()=>{
    const result=Utils.shuffleArr([])    
    expect(result).toEqual([])
    expect(result).not.toEqual(undefined)


})
test('Should return string',()=>{
    const result=Utils.getTime(216000)    
    expect(typeof result).toEqual('string')
    expect(result).not.toBeFalsy()

})
test('Should return string',()=>{
    const result=Utils.getTime(216000)       
    expect(result).not.toEqual(new Date())

})
test('Should return string or number',()=>{
    const result=Utils.getKeyByValue({'date':'18.02.2022','time':216000}, 'date')    
    expect(typeof result).not.toBe('number'||"string")
})
test('Should return key by value',()=>{
    const result=Utils.getKeyByValue({'time':216000}, 216000)    
    expect(result).toBe('time')
})

test('Should return boolean',()=>{
    const result=Utils.compareObjects({},{})   
   
    expect( result).not.toBe(undefined)

})

test('Should get chunks',()=>{
    const result=Utils.getChunks([], 2)   
    expect(result instanceof Array).toBe(true)   

})