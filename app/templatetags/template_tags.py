from django import template

register = template.Library()

registrated_templates = set()


def js_template(parser, token):
    nodelist = parser.parse(('endjs',))
    parser.delete_first_token()
    return UpperNode(nodelist)


class UpperNode(template.Node):
    def __init__(self, nodelist):
        self.nodelist = nodelist

    def render(self, context):
        output = self.nodelist.render(context)
        return output.upper()


register.tag("js_template", js_template)
