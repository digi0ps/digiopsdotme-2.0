from django.forms import ModelForm
from blog.models import article


class ArticleForm(ModelForm):
	class Meta:
		model = article
		fields = ['title', 'content']
