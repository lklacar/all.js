# Create your views here.
from django.shortcuts import render_to_response
from rest_framework import serializers
from rest_framework.viewsets import ModelViewSet

from app.models import Post


def index(request):
    return render_to_response("index.html")


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('text', 'timestamp')


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


def template(request, name):

    return render_to_response(name + ".html")
