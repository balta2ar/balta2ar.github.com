---
title: "Parallel processing of a tree with several workers"
date: 2023-01-21T18:42:16+01:00
draft: false
tags: ["programming", "parallel", "queue", "workers"]
---
Every once in a while I need to write a script that traverses some structure,
typically a tree, that does something to every item, usually just prints it,
or makes a query that contains such item. It's fine to implement it
in a sequential manner if you have only few elements, but sometimes
it takes longer than I wish it took. Surprisingly often I found myself
implementing the same pattern, where I create a bunch of workers, and they
start traversing the structure all at the same time.

Let's start with the following imports:
```python
from time import sleep, time
from threading import Thread, Lock
from collections import deque
```

Now let's define our node:
```python
class Node:
    def __init__(self, data, children=None):
        self.data = data
        self.children = [] if children is None else children
    def add_child(self, obj):
        self.children.append(obj)
    def get_children(self):
        sleep(0.1)
        return self.children
    @staticmethod
    def sample():
        return Node(0, [
            Node(1, [
                Node(2),
                Node(3),
            ]),
            Node(4, [
                Node(5),
                Node(6),
                Node(7),
                Node(8, [
                    Node(9),
                    Node(10),
                ]),
            ]),
        ])
```
To see the timing effect of our optimizations later I added `sleep(0.1)`
in `get_children` method.

Sequential traversal is just a simple recursion: we add current data
to the output and recursively go down to children, expanding on the result:
```python
def sequential(node):
    out = [node.data]
    for child in node.get_children():
        out += sequential(child)
    return out
```
When I measure this, I get the following timing:
```python
if __name__ == '__main__':
    node = Node.sample()

    t0 = time()
    print(sorted(sequential(node)))
    print(time() - t0)
```
```text
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
1.1016435623168945
```

The idea behind processing a tree in several workers is as follows:

1. Start several workers
2. Wait for workers to complete processing

Item #2 sounds a bit abstract, if you ask me. What is the condition
that says that we're done processing the tree?

Let's say we have a queue of items that should be processed. We start with
root and as we move along the tree, we add each node's children to
the queue. Can we say that we're done with processing if the queue is empty?

```
# queue = [node8]
w1: queue.take() is not None => node8.get_children() => sleep(0.1)
w2: queue.take() is None => terminate?
```

If we only check the size of the queue, we may end up falling prey to a bad
timing when one of the workers took an item from the queue, making the queue
empty, and while waiting for `get_children`, other workers woke up, requested
items from an empty queue, and then they decided to terminate.

What can help us is not only tracking the size of the queue, but if any items
that were taken out of the queue are still being processed. We will
use a helper class to abstract that away:
```python
class MyQueue:
    def __init__(self):
        self.lock = Lock()
        self.xs = []
        self.running = 0
    def add(self, obj):
        with self.lock:
            self.xs.append(obj)
    def take(self):
        with self.lock:
            if len(self.xs) > 0:
                self.running += 1
                return self.xs.pop(0)
            else:
                return None
    def release(self):
        with self.lock:
            self.running -= 1
    def empty(self):
        with self.lock:
            return len(self.xs) == 0 and self.running == 0
```
Given that we will access it from different threads, we need to protect
all operations with a lock. Another crucial part is `self.running` -- when
we `take` item from a queue, we increment `self.running`, and when a worker
is done processing the item, even if there are no children, the worker
marks it as done with `release`.

To put all together:
```python
def parallel(root):
    queue = MyQueue()
    queue.add(root)
    out = deque()
    def work():
        while not queue.empty():
            node = queue.take()
            if node is None:
                sleep(0.05) # waiting for more work to arrive
                continue
            out.append(node.data)
            for child in node.get_children():
                queue.add(child)
            queue.release()
    threads = []
    for _ in range(10):
        t = Thread(target=work, args=())
        t.start()
        threads.append(t)
    for t in threads:
        t.join()
    return list(out)
```
And now the running time is:
```python
    t0 = time()
    print(sorted(parallel(node)))
    print(time() - t0)
```
output:
```text
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
0.4521338939666748
```

This approach is crude but fine for short scripts when you need to
quickly botch something up together. However, it might not be optimial
under load, especially this block is rather wasteful:
```python
if node is None:
    sleep(0.05) # waiting for more work to arrive
    continue
```