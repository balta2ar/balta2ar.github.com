---
layout: page
title: Свежатинка
group: 'navigation'
order: 0
---
<h2>Свежее</h2>
<ol class="posts">
    {% for post in site.posts limit:3 %}
    <li><p><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></p></li>
    {% endfor %}
</ol>

{% assign preview_count = 2 %}
{% include preview.md %}
