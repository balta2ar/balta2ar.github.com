<ul>
{% for p in site.posts limit:preview_count %}
    <li class='preview'><span>{{ p.date | date_to_string }}</span> &ratio; <a href="{{ p.url }}">{{ p.title }}</a></li>
        <p>{{ p.content | strip_html | truncatewords:75 }}</p><br>
        <br>

{% endfor %}
</ul>

{% assign preview_count = nil %}
