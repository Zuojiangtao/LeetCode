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
**_算法思想是：将数组找出中间值作为基准值，并定义2个空数组，小于基准值的放到做左边数组，大于基准值的放到右边；然后递归这2个数组，直至数组元素只有1个；最后返回拼接数组。_**

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

#### 7. 堆排序：
> 堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法,堆排序是一种选择排序.

**_算法思想是：将数组转为大顶堆；将堆顶元素和最后一个元素交换，得到新的无序区和有序区；由于交换后的堆顶可能违反堆的性质，因此对无序区调整为新堆，然后再次将堆顶和最后一个元素交换，如此循环直到有序区的元素为n-1._**

![堆排序](https://upload-images.jianshu.io/upload_images/2463290-3664d3fbfb9ed77a.gif?imageMogr2/auto-orient/strip|imageView2/2/w/547/format/webp)

```js
let len;

// 建立大顶堆
function buildMaxHeap(arr){
    len = arr.length;
    for(let i=Math.floor(len/2); i>=0; i--){
        heapify(arr,i);
    }
}
// 堆调整
function heapify(arr,i){
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
    if(left<len && arr[left]>arr[largest]){
        largest = left;
    }
    if(right<len && arr[right]>arr[largest]){
        largest = right;
    }
    if(largest != i){
        swap(arr,i,largest);
        heapify(arr,largest);
    }
}
// 交换位置
function swap(arr,i,j){
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
// 推排序
function HeapSort(arr){
    buildMaxHeap(arr);  // 建立大顶堆
    for(let i=arr.length-1; i>0; i--){
        swap(arr,0,i);
        len--;
        heapify(arr,0);
    }
    return arr;
}
```

### O(n)时间复杂度：

#### 8. 计数排序：
> 计数排序不是基于比较的排序算法，其核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。 作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。

![计数排序](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015231740840-6968181.gif)

```js
function CountingSort (arr, maxValue) {
    const bucket = new Array(maxValue + 1)
    let sortedIndex = 0
    const arrLength = arr.length
    const bucketLen = maxValue + 1
    for (let i = 0; i < arrLength; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0
        }
        bucket[arr[i]]++
    }
    for(let j = 0; j < bucketLen; j++){
        while(bucket[j] > 0){
            arr[sortedIndex++] = j
            bucket[j]--
        }
    }
    return arr
}
```

#### 9. 基数排序：
> 基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。

**_算法思想是：取得数组的最大值并获得其位数；arr为原始数组，从最低位开始取每个位组成radix数组；对radix进行计数排序（利用计数排序适用于小范围数的特点）_**

![基数排序](https://images2017.cnblogs.com/blog/849589/201710/849589-20171015232453668-1397662527.gif)

```js
const counter = [];

function RadixSort(arr, maxDigit){
    let mod = 10
    let dev = 1
    for(let i = 0; i < maxDigit; i++, dev*=10, mod*=10){
        for(let j = 0; j < arr.length; j++){
            const bucket = parseInt((arr[j] % mod) / dev)
            if(counter[bucket] == null){
                counter[bucket] = []
            }
            counter[bucket].push(arr[j])
        }
        let pos = 0;
        for(let j = 0; j < counter.length; j++){
            let value = null
            if(counter[j] != null){
                while((value=counter[j].shift()) != null){
                    arr[pos++] = value
                }
            }
        }
    }
    return arr
}
```

#### 10. 桶排序：
> 桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。

**_算法思想是：将数组均匀分布到几个桶里，然后对每个桶里的数据排序，再将各个桶里的数据拼接。至于桶的数量的选择，在小于数组的范围内尽可能的多，保证数据均匀分布到尽可能多的桶里。_**

![桶排序](https://img-blog.csdnimg.cn/20190219081232815.png)

```js
function BucketSort(arr, bucketSize){  // 桶的数量不能为负
    if(arr.length === 0){
        return arr;
    }
    let i;
    let minValue = arr[0];
    let maxValue = arr[0];
    for(i = 1; i < arr.length; i++){
        if(arr[i] < minValue){
            minValue = arr[i];   // 输出最小的值
        }else if(arr[i] > maxValue){
            maxValue = arr[i];   // 输出最大的值
        }
    }

    // 桶的初始化
    const DEFAULT_BUCKET_SIZE = 5;   // 设置桶的默认数量为5，根据数组长度可以调整
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const buckets = new Array(bucketCount);
    for(i = 0; i < buckets.length; i++){
        buckets[i] = [];
    }
    // 利用映射函数将数据分配到各个桶中
    for(let i = 0; i < arr.length; i++){
        buckets[Math.floor((arr[i] - minValue)/bucketSize)].push(arr[i]);
    }
    arr.length = 0;
    for(i=0; i < buckets.length; i++){
        insertSort(buckets[i]);  // 对每个桶进行排序，这里使用了插入排序
        for(let j = 0; j < buckets[i].length; j++){
            arr.push(buckets[i][j]);
        }
    }
    return arr;
}
// 插入排序
function insertSort(arr){
    const len = arr.length;
    let preIndex, current;
    for(let i = 0; i < len; i++){
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current){
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}
```
