---
layout: post
title: "Octopress to rule them all"
date: 2013-10-13 19:11
comments: true
categories:
    - octopress
    - rake
    - ruby
    - virtualenv
    - command line
---

It's been a long while since I decided to switch from [Google Blogspot](http://baltazar-bz.blogspot.ru/)
to Octopress and start blogging like a geek. For almost a year I couldn't
force myself to write even a short post. There were different reasons to that,
and some of them are technical. Being a complete rookie to Ruby, I was scared
by all these daunting rake commands and Octopress machinery. It actually helped
me to write down and summarize the commands that I need in a single place. Now
I'd like them to be a separate post just as a little reminder to myself.

<!-- more -->

What I liked about Octopress immediately is markdown, of course. It wasn't
nearly convenient to fix an old post in Blogspot as it is in Octopress. You can
edit Blogspot posts right onsite to make it easier. Not for me. The feature of
switching modes between compose/HTML didn't help at all. Stop messing with
HTML in every post was a very attactive feature of Octopress. Besides, having
a blog in public so that people can send you pull requests is so cool that it
must be declared illegal.

Anyway, I made my decision and here it goes. I followed carefully [Octopress
documentation](http://octopress.org/docs/). It wasn't a piece of cake to install
correct version of Ruby, all necessary bundles, deal with [broken](http://www.nonsenseby.me/blog/2013/04/13/arch-linux/)
[pygments](https://github.com/tmm1/pygments.rb/issues/45), configure my own
color scheme, and got it up and running eventually. Hopefully, I got through
all that and now it's time to relax in a serene joy and write one post after
another like a mad.

To do that, I use the following commands.

### 1. Switch to source branch

```
git checkout source
```

### 2. Activate rake

```
source /home/bz/.rvm/scripts/rvm
rvm use 1.9.3
```

### 3. Setup environment for pygmentize
The problem with pygmentize out of the box is that mentos.py in my version
calls for `/usr/bin/env python` which is `python3` in ArchLinux by default.
However, `python2` is required. To fix that, I created virtualenv where
`python2.7` is active by default. Activate it before generating the blog:

```
source ~/.virtualenvs/blog_env/bin/activate
```

### 4. Run preview/generate server

```
jekyll --auto --server --future
```

Other useful commands might be:

```
rake preview
rake watch
```

### 5. Create new post

```
rake new_post\["How I spent the summer"\]
```

### 6. Deploy
When ready, I usually do `rake generate` once again (just to be safe),
commit to the source branch, push and finally deploy. All this happens in the
source branch of the blog (`rake deploy` automatically deals with `master`):

```
rake generate
git add .
git commit -m "New post about the last summer"
git push
rake deploy
```

And I got new post upstream in a matter of seconds.

---
