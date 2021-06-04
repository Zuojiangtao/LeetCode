## 排序

> 排序可以说是程序员学习算法的最先要接触的算法了，而且前端面试算法基本都会被面到，因此对几大排序算法做了总结。

根据[算法与数据结构-排序](../README.md)来，按照 _时间复杂度(平均)_ 来对十大排序算法进行总结。

<img src="https://images2018.cnblogs.com/blog/849589/201804/849589-20180402133438219-1946132192.png" alt="算法复杂度图示">

### O(n^2)时间复杂度：

#### 1. 冒泡排序：
**_算法思想是：比较相邻元素，如果前一个比后一个大则交换他们的位置；对每对相邻元素做比较，从开始到结束；重复以上步骤，直到排序完毕。_**

![冒泡排序](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015223238449-2146169197.gif)

```js
const BubbleSort = function(nums) {
    let length = nums.length
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i;  j++) {
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
            }
        }
    }
    return nums
}
```

#### 2. 插入排序：
**_算法思想是：选取后续目标元素与前面的已排序元素队列进行从后向前比对；如果队列中的元素值大于目标元素，那么目标元素位置向前移动；直到找到小于或等于目标元素的值为止，将目标元素插入到找到的这个位置；重复以上步骤，直到排序完毕；_**

![插入排序](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015225645277-1151100000.gif)

```js
const InsertSort = function(nums) {
    let length = nums.length
    for (let i = 0; i < length; i++) {
        let current = nums[i]
        let preIdx = i - 1
        while (preIdx >= 0 && nums[preIdx] > current) {
            nums[preIdx + 1] = nums[preIdx]
            preIdx--
        }
        nums[preIdx + 1] = current
    }
    return nums
}
```

#### 3. 选择排序：
**_算法思想是：循环将目标元素和后面的除去目标元素的数组做比较查找最小值；将找出的最小值和目标元素交换；重复以上步骤，直到排序完毕。_**

![选择排序](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015224719590-1433219824.gif)

```js
const SelectSort = function(nums) {
    let length = nums.length
    for (let i = 0; i < length; i++) {
        let minIdx = i
        for (let j = i + 1; j < length; j++) {
            if (nums[j] < nums[minIdx]) {
                minIdx = j
            }
        }
        [nums[i], nums[minIdx]] = [nums[minIdx], nums[i]]
    }
    return nums
}
```

#### 4. 希尔排序：
> 希尔排序其实是插入排序的一种，它是针对直接插入排序算法的改进，该方法又称缩小增量排序。

**_算法思想是：将插入排序分组区间gap执行，对组内元素插入排序，区间逐步缩小，直至gap缩小为1，那么将得到最终结果。就是将数组不断对折执行，直到无法对折，有点类似于二分查找的并行版。_**

![希尔排序](https://images2018.cnblogs.com/blog/849589/201803/849589-20180331170017421-364506073.gif)

```js
const ShellSort = function(nums) {
    let length = nums.length
    for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < length; i++) {
            let current = nums[i]
            let curIdx = i
            while (curIdx - gap >= 0 && current < nums[curIdx - gap]) {
                nums[curIdx] = nums[curIdx - gap]
                curIdx -= gap
            }
            nums[curIdx] = current
        }
    }
    return nums
}
```

### O(nlog n)时间复杂度：

#### 5. 归并排序：
> 归并排序采用分治思想，是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。

**_算法思想是：递归将整个数组分为多个区间，然后每个区间比较排序，最后将各个区间整合。_**

![归并排序](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015230557043-37375010.gif)

```js
const MergeSort = function(nums) {
    let length = nums.length
    if (length < 2) {
        return nums
    }
    let middle = Math.floor(length/2)
    //拆分成两个子数组
    let left =  nums.slice(0, middle)
    let right = nums.slice(middle, length)
    //递归拆分
    let mergeSortLeft = MergeSort(left)
    let mergeSortRight = MergeSort(right)
    //合并
    return merge(mergeSortLeft, mergeSortRight)
}

const merge = (left, right) => {
    const result = [];

    while (left.length && right.length) {
        // 注意: 判断的条件是小于或等于，如果只是小于，那么排序将不稳定.
        if (left[0] <= right[0]) {
            result.push(left.shift()); //每次都要删除left或者right的第一个元素，将其加入result中
        } else {
            result.push(right.shift());
        }
    }
    //将剩下的元素加上
    while (left.length) result.push(left.shift());

    while (right.length) result.push(right.shift());

    return result;
};
```

#### 6. 快速排序：
**_算法思想是：将数组找出中间值作为基准值，并定义2个空数组，小于基准值的放到做左边数组，大于基准值的放到右边；然后递归这2个数组，直至数组元素只有1一个；最后返回拼接数组。_**

![快速排序](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015230936371-1413523412.gif)

```js
const QuickSort = function(nums) {
    if (nums.length <= 1) return nums
    let left = [], right = []
    let mid = Math.floor(nums.length / 2)
    let temp = nums.splice(mid, 1)[0]
    for (let i = 0, length = nums.length; i < length; i++) {
        if (nums[i] < temp) {
            left.push(nums[i])
        } else {
            right.push(nums[i])
        }
    }
    return QuickSort(left).concat(temp, QuickSort(right))
}
```
