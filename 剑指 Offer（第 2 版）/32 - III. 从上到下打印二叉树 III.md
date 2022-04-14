## [32 - III. 从上到下打印二叉树 III](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/)

<p>
请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。
</p>

```
示例 1：

给定二叉树: [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7

返回： 
[
  [3],
  [20,9],
  [15,7]
]
```

> #### 提示：
>
> 节点总数 <= 1000

<p style="font-size: 14px">
来源：力扣（LeetCode） <br>
链接：https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/ <br>
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
</p>

#### 解题思路和方法：
- BFS

**_和上一题基本相同，在push到结果数组的时候判断奇偶行，然后将偶数行反转。_**

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) return []
    let result = []
    let queue = [root]
    while(queue.length) {
        let arr = []
        for(let i = queue.length; i > 0; i--) {
            let node = queue.shift()
            arr.push(node.val)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        result.length % 2 === 1 && arr.reverse()
        result.push(arr)
    }
    return result
};
```

- BFS

**_在每层处理时，判断这一层使用push还是unshift，降低时间复杂度。_**

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) return []
    let result = []
    let queue = [root]
    while(queue.length) {
        let arr = []
        for(let i = queue.length; i > 0; i--) {
            let node = queue.shift()
            // 判断本层的奇偶，判断采用push还是unshift
            result.length % 2 === 1 ? arr.unshift(node.val) : arr.push(node.val)
            node.left && queue.push(node.left)
            node.right && queue.push(node.right)
        }
        result.push(arr)
    }
    return result
};
```

#### leetcode题解精选
- 层序遍历 + 倒序
```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        List<List<Integer>> res = new ArrayList<>();
        if(root != null) queue.add(root);
        while(!queue.isEmpty()) {
            List<Integer> tmp = new ArrayList<>();
            for(int i = queue.size(); i > 0; i--) {
                TreeNode node = queue.poll();
                tmp.add(node.val);
                if(node.left != null) queue.add(node.left);
                if(node.right != null) queue.add(node.right);
            }
            if(res.size() % 2 == 1) Collections.reverse(tmp);
            res.add(tmp);
        }
        return res;
    }
}

作者：jyd
链接：https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/solution/mian-shi-ti-32-iii-cong-shang-dao-xia-da-yin-er--3/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

#### 解题总结
和上道题相似，注意偶数行数组的反转。
