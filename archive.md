---
layout: page
title: Архив
group: 'navigation'
---
<h2>All Posts</h2>
<ol class="posts">
    {% for post in site.posts %}
    <li><p><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></p></li>
    {% endfor %}
</ol>
