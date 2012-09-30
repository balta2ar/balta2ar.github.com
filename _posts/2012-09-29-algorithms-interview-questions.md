---
layout: post
title: Вопросы на собеседовании из курса Algorithms
---

<div id="notextindent" markdown="1">

# Вопросы на собеседовании из курса Algorithms

Заканчивается первая часть курса Algorithms на coursera.org. Это был один из
немногих курсов, в котором мне понравилось абсолютно всё: прекрасная подача
материала (лектор --- сам Седжвик), наглядные слайды, наличие сопутствующей курсу
книги, из которой можно почерпнуть больше подробностей по теме, нетривиальные
домашние задания и, наконец, вопросы для интервью.

Я первый раз вижу, чтобы в курсе давали примеры таких вопросов. Это отличное
подспорье для подготовки к собеседованиям, и поэтому я хочу поделиться ими
здесь. <!-- Для многих вопросов есть подсказки. Выделите текст, чтобы их
увидеть. -->

## Union-Find

### Question 1 Social network connectivity

Given a social network containing `N` members and a
log file containing `M` timestamps at which times pairs of members formed
friendships, design an algorithm to determine the earliest time at which all
members are connected (i.e., every member is a friend of a friend of a friend
... of a friend). Assume that the log file is sorted by timestamp and that
friendship is an equivalence relation. The running time of your algorithm should
be `MlogN` or better and use extra space proportional to `N`.

Hint: union-find.
{: .spoiler}

### Question 2 Union-find with specific canonical element

Add a method `find()` to the
union-find data type so that `find(i)` returns the largest element in the
connected component containing `i`. The operations, `union()`, `connected()`, and
`find()` should all take logarithmic time or better.

For example, if one of the connected components is `{1,2,6,9}`, then the
`find()` method should return 9 for each of the four elements in the connected
components.

Hint: maintain an extra array to the weighted quick-union data structure that
stores for each root `i` the large element in the connected component containing
`i`.
{: .spoiler}


### Question 3 Successor with delete

Given a set of `N` integers `S={0,1,...,N−1}` and a sequence
of requests of the following form:

* Remove `x` from `S`
* Find the successor of `x`: the smallest `y` in `S` such that `y ≥ x`.

design a data type so that all operations (except construction) should take
logarithmic time or better.

Hint: use the modification of the union-find data discussed in the previous
question.
{: .spoiler}

### Question 4 Union-by-size

Develop a union-find implementation that uses the same
basic strategy as weighted quick-union but keeps track of tree height and always
links the shorter tree to the taller one. Prove a `lgN` upper bound on the height
of the trees for `N` sites with your algorithm.

Hint: replace the `sz[]` array with a `ht[]` array such that `ht[i]` stores the height
of the subtree rooted at `i`.
{: .spoiler}

## Analysis of Algorithms

### Question 1 3-SUM in quadratic time

Design an algorithm for the 3-SUM problem
that takes time proportional to `N²` in the worst case. You may assume that you
can sort the `N` integers in time proportional to `N²` or better.

<div markdown="0" class="spoilercontainer">
<input type="checkbox" class="spoilerbutton" value="spoiler"/>
Hint
<p markdown="1" class="spoiler">
given an integer x and a sorted array `a[]` of `N` distinct integers, design a
linear-time algorithm to determine if there exists two distinct indices `i` and
`j` such that `a[i] + a[j] == x`.
</p>
</div>

### Question 2 Search in a bitonic array

An array is
bitonic if it is comprised of an increasing sequence of integers followed
immediately by a decreasing sequence of integers. Write a program that, given a
bitonic array of `N` distinct integer values, determines whether a given integer
is in the array.  Standard version: Use `∼3lgN` compares in the worst case.
Signing bonus: Use `∼2lgN` compares in the worst case (and prove that no algorithm
can guarantee to perform fewer than `∼2lgN` compares in the worst case).

Hints: Standard version. First, find the maximum integer using `∼1lgN`
compares --- this divides the array into the increasing and decreasing pieces.
Signing bonus. Do it without finding the maximum integer.
{: .spoiler}

### Question 3 Egg drop

Suppose that you have an `N`-story building and plenty of eggs. An egg breaks if
it is dropped from floor `T` or higher and does not break otherwise. Your goal is
to devise a strategy to determine the value of `T` given the following limitations
on the number of eggs and tosses:

* Version 0: 1 egg, `≤ T` tosses.
* Version 1: `∼1lgN` eggs and `∼1lgN` tosses.
* Version 2: `∼lgT` eggs and `∼2lgT` tosses.
* Version 3: 2 eggs and `∼2 sqrt(N)` tosses.
* Version 4: 2 eggs and `≤ c sqrt(T)` tosses for some fixed constant `c`.

Hints:
{: .spoiler}

* Version 0: sequential search.
* Version 1: binary search.
* Version 2: find an interval containing `T` of size `≤2T`, then do binary search.
* Version 3: find an interval of size `sqrt(N)`, then do sequential search.
{: .spoiler}

Note: can be improved to `∼sqrt(2N)` tosses.
{: .spoiler}

* Version 4: `1 + 2 + 3 + ... + t ∼ 1/2 t²`. Aim for `c = 2 sqrt(2)`.
{: .spoiler}

## Stacks and Queues

### Question 1 Queue with two stacks

Implement a queue with two stacks so that each queue operations takes a constant
amortized number of stack operations.

Hint: If you push elements onto a stack and then pop them all, they appear in
reverse order. If you repeat this process, they are now back in order.
{: .spoiler}

### Question 2 Stack with max

Create a data structure that efficiently supports the stack operations (push and
pop) and also a return-the-maximum operation. Assume the elements are reals
numbers so that you can compare them.

Hint: Use two stacks, one to store all of the items and a second stack to store
the maximums.
{: .spoiler}

### Question 3 Java generics

Explain why Java prohibits generic array creation.

Hint: to start, you need to understand that Java arrays are covariant but Java
generics are not: that is, `String[]` is a subtype of `Object[]`, but
`Stack<String>` is not a subtype of `Stack<Object>`.
{: .spoiler}

### Question 4 Detect cycle in a linked list

A singly-linked data structure is a data structure made up of nodes where each
node has a pointer to the next node (or a pointer to `null`). Suppose that you
have a pointer to the first node of a singly-linked list data structure:

* Determine whether a singly-linked data structure contains a cycle. You may use
  only two pointers into the list (and no other variables). The running time of
  your algorithm should be linear in the number of nodes in the data structure.
* If a singly-linked data structure contains a cycle, determine the first node
  that participates in the cycle. you may use only a constant number of pointers
  into the list (and no other variables). The running time of your algorithm
  should be linear in the number of nodes in the data structure.

You may not modify the structure of the linked list.

Hint: maintain a tortoise pointer that advances one node per time step and a
hare pointer that advances two nodes per time step.
{: .spoiler}

### Question 5 Clone a linked structure with two pointers per node

Suppose that you are given a reference to the first node of a linked structure
where each node has two pointers: one pointer to the next node in the sequence
(as in a standard singly-linked list) and one pointer to an arbitrary node.

{% highlight java %}
private class Node {
    private String item;
    private Node next;
    private Node random;
}
{% endhighlight %}

Design a linear-time algorithm to create a copy of the doubly-linked structure.
You may modify the original linked structure, but you must end up with two
copies of the original.

Hint: begin by inserting a new node `x′` into the linked list immediately after
each original node `x`.
{: .spoiler}

## Elementary Sorts

### Question 1 Intersection of two sets

Given two arrays `a[]` and `b[]`, each containing N distinct points in the plane,
design a subquadratic algorithm to determine how many points are contained in
both arrays.

Hint: shellsort.
{: .spoiler}

### Question 2 Permutation

Given two integer arrays of size `N`, design a subquadratic algorithm to determine
whether one is a permutation of the other. That is, do they contain exactly the
same entries but, possibly, in a different order.

Hint: sort both arrays.
{: .spoiler}

### Question 3 Dutch national flag

Given an array of N buckets, each containing a red, white, or blue pebble, sort
them by color. The allowed operations are:

* `swap(i,j)`: swap the pebble in bucket `i` with the pebble in bucket `j`.
* `color(i)`: color of pebble in bucket `i`.

The performance requirements are as follows:

* At most `N` calls to `color()`.
* At most `N` calls to `swap()`.
* Constant extra space.

## Mergesort

### Question 1 Merging with smaller auxiliary array

Suppose that the subarray `a[0]` to `a[N-1]` is sorted and the subarray `a[N]` to
`a[2 * N-1]` is sorted. How can you merge the two subarrays so that `a[0]` to
`a[2 * N-1]` is sorted using an auxiliary array of size `N` (instead of `2N`)?

Hint: copy only the left half into the auxiliary array.
{: .spoiler}

### Question 2 Counting inversions

An inversion in an array `a[]` is a pair of entries `a[i]` and `a[j]` such that
`i < j` but `a[i] > a[j]`. Given an array, design a linearithmic algorithm to
count the number of inversions.

Hint: count while mergesorting.
{: .spoiler}

### Question 3 Shuffling a linked list

Given a singly-linked list containing `N` items, rearrange the items uniformly at
random. Your algorithm should consume a logarithmic (or constant) amount of
extra memory and run in time proportional to `NlogN` in the worst case.

Hint: design a linear-time subroutine that can take two uniformly shuffled
linked lists of sizes `N₁` and `N₂` and combined them into a uniformly shuffled
linked lists of size `N₁ + N₂`.
{: .spoiler}

## Quicksort

### Question 1 Nuts and bolts

A disorganized carpenter has a mixed pile of `N` nuts and `N` bolts. The goal is to
find the corresponding pairs of nuts and bolts. Each nut fits exactly one bolt
and each bolt fits exactly one nut. By fitting a nut and a bolt together, the
carpenter can see which one is bigger (but the carpenter cannot compare two nuts
or two bolts directly). Design an algorithm for the problem that uses `NlogN`
compares (probabilistically).

Hint: modify the quicksort partitioning part of quicksort.
{: .spoiler}

Remark: This [research paper](http://www.cs.ucla.edu/~rafail/PUBLIC/17.pdf)
gives an algorithm that runs in `N log⁴ N` time in the worst case.

### Question 2 Selection in two sorted arrays

Given two sorted arrays `a[]` and `b[]`, of sizes `N₁` and `N₂`, respectively,
design an algorithm to find the kth largest key. The order of growth of the
worst case running time of your algorithm should be `logN`, where `N = N₁ + N₂`.

* Version 1: `N₁ = N₂` and `k = N/2`
* Version 2: `k = N/2`
* Version 3: no restrictions

Hints: there are two basic approaches.
{: .spoiler}

* Approach A: Compute the median in `a[]` and the median in `b[]`. Recur in a
  subproblem of roughly half the size.
* Approach B: Design a constant-time algorithm to determine whether `a[i]` is the
  `k`-th largest key. Use this subroutine and binary search.
{: .spoiler}

Dealing with corner cases can be tricky.
{: .spoiler}

### Question 3 Decimal dominants

Given an array with `N` keys, design an algorithm to find all values that occur
more than `N/10` times. The expected running time of your algorithm should be
linear.

Hint: determine the `(N/10)`-th largest key using quickselect and check if it
occurs more than `N/10` times.
{: .spoiler}

Alternate solution hint: use 9 counters.
{: .spoiler}

## Priority Queues

### Question 1 Dynamic median

Design a data type that supports insert in logarithmic time, find-the-median in
constant time, and remove-the-median in logarithmic time.

Hint: maintain two binary heaps, one that is max-oriented and one that is
min-oriented.
{: .spoiler}

### Question 2 Randomized priority queue

Describe how to add the methods `sample()` and `delRandom()` to our binary heap
implementation. The two methods return a key that is chosen uniformly at random
among the remaining keys, with the latter method also removing that key. The
`sample()` method should take constant time; the `delRandom()` method should take
logarithmic time. Do not worry about resizing the underlying array.

### Question 3 Taxicab numbers

A taxicab number is an integer that can be expressed as the sum of two cubes of
integers in two different ways: `a³ + b³ = c³ + d³`. For example,
`1729 = 9³ + 10³ = 1³ + 12³`.

Design an algorithm to find all taxicab numbers with `a`, `b`, `c`, and `d` less
than `N`.

* Version 1: Use time proportional to `N² logN` and space proportional to `N²`.
* Version 2: Use time proportional to `N² logN` and space proportional to `N`.

Hints:
{: .spoiler}

* Version 1: Form the sums `a³ + b³` and sort.
* Version 2: Use a min-oriented priority queue with `N` items.
{: .spoiler}

## Elementary Symbol Tables

### Question 1 Java autoboxing and `equals()`

Consider two double values a and b and their corresponding Double values `x` and
`y`.

* Find values such that `(a == b)` is true but `x.equals(y)` is false.
* Find values such that `(a == b)` is false but `x.equals(y)` is true.

Hint: IEEE floating point arithmetic has some peculiar rules for `0.0`, `-0.0`, and
`NaN`. Java requires that `equals()` implements an equivalence relation.
{: .spoiler}

### Question 2 Check if a binary tree is a BST

Given a binary tree where each Node contains a key, determine whether it is a
binary search tree. Use extra space proportional to the height of the tree.

Hint: design a recursive function `isBST(Node x, Key min, Key max)` that
determines whether `x` is the root of a binary search tree with all keys between
min and max.
{: .spoiler}

### Question 3 Inorder traversal with constant extra space

Design an algorithm to perform an inorder traversal of a binary search tree
using only a constant amount of extra space.

Hint: you may modify the BST during the traversal provided you restore it upon
completion.
{: .spoiler}

### Question 4 Web tracking

Suppose that you are tracking N web sites and M users and you want to support
the following API:

* User visits a website.
* How many times has a given user visited a given site?

What data structure or data structures would you use?

Hint: maintain a symbol table of symbol tables.
{: .spoiler}

## Balanced Search Trees

### Question 1 Red-black BST with no extra memory

Describe how to save the memory for storing the color information when
implementing a red-black BST.

Hint: modify the structure of the BST to encode the color information.
{: .spoiler}

### Question 2 Document search

Design an algorithm that takes a sequence of `N` document words and a sequence of
`M` query words and find the shortest interval in which the `M` query words appear
in the document in the order given. The length of an interval is the number of
words in that interval.

Hint: for each word, maintain a sorted list of the indices in the document in
which that word appears. Scan through the sorted lists of the query words in a
judicious manner.
{: .spoiler}

### Question 3 Generalized queue

Design a generalized queue data type that supports all of the following
operations in logarithmic time (or better) in the worst case.

* Create an empty data structure.
* Append an item to the end of the queue.
* Remove an item from the front of the queue.
* Return the `i`-th item in the queue.
* Remove the `i`-th item from the queue.

Hint: create a red-black BST where the keys are integers and the values are the
items such that the i^th largest integer key in the red-black BST corresponds to
the `i`-th item in the queue.
{: .spoiler}

## Geometric Applications of BSTs

### Question 1 Stabbing count queries

Suppose that you have a huge log file containing the entry and exit time for
each of the `N` people that entered and exited a building on a given day. Design a
data type that returns the number of people in the building at any given query
time. Each query should take logarithmic time or better as a function of `N`.

Hint: you can interpret each log entry as an interval whose left endpoint is the
entry time and whose right endpoint is the exit time. Put the left endpoints in
one data structure and the right endpoints in another data structure. Use the
`rank()` method.
{: .spoiler}

## Hash Tables

### Question 1 4-SUM

Given an array `a[]` of `N` integers, the 4-SUM problem is to determine if there
exist distinct indices `i`, `j`, `k`, and `l` such that `a[i] + a[j] = a[k] +
a[l]`. Design an algorithm for the 4-SUM problem that takes time proportional
to `N²` (under suitable technical assumptions).

Hint: create a hash table with (N/2) (binome) key-value pairs.
{: .spoiler}

### Question 2 Hashing with wrong `hashCode()` or `equals()`

Suppose that you implement a data type `OlympicAthlete` for use in a
`java.util.HashMap`.

* Describe what happens if you override `hashCode()` but not `equals()`.
* Describe what happens if you override `equals()` but not `hashCode()`.
* Describe what happens if you override `hashCode()` but implement public boolean
  `equals(OlympicAthlete that)` instead of `public boolean equals(Object that)`.

Hint: it is code — try it and see!
{: .spoiler}

</div>

