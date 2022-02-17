import Utils from "../utils";


test('Should return number`',()=>{
    const result=Utils.getMonth('Mar')
    const targetMonth=2
    expect(result).toBe(targetMonth)

})

test('Should return randomInteger number`',()=>{
    const result=Utils.randomInteger(1,2)
    const rand=2??1
    expect(result).toEqual(rand)

})

test('Should return array`',()=>{
    const result=Utils.shuffleArr([])    
    expect(result).toEqual([])

})
// test('Should return array`',()=>{
//     const result=Utils.shuffleArr([])    
//     expect(result).toEqual([])

// })