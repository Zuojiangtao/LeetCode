function twoSum(nums: number[], target: number): number[] {
  // @ts-ignore
  let sumMap: any = new Map()
  for(let i: number = 0; i < nums.length; i++) {
    let temp: number = target - nums[i]
    if(sumMap.has(temp)) {
      return [sumMap.get(temp), i]
    }
    sumMap.set(nums[i], i)
  }
}
