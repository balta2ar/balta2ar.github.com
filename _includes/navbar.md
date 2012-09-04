{% for i in (0..3) reversed %}
    {% for node in pages_list %}
        {% if node.order == i %}
            {% if group == nil or group == node.group %}
                {% if page.url == node.url %}
                    <a href="{{node.url}}"><span class="navbut active">{{node.title}}</span></a>
                {% else %}
                    <a href="{{node.url}}"><span class="navbut">{{node.title}}</span></a>
                {% endif %}
            {% endif %}
        {% endif %}
    {% endfor %}
{% endfor %}

{% assign pages_list = nil %}
{% assign group = nil %}
