from django.conf.urls import patterns, url

from todolist import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),    
    url(r'^addtask/$', views.add_task),
    url(r'^edittask/$', views.edit_task),
    url(r'^deletetask/$', views.delete_task),
    url(r'^editproject/$', views.edit_project),
    url(r'^addproject/$', views.add_project),
    url(r'^deleteproject/$', views.delete_project),
    
    
    )