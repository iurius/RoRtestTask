import json
from django.http import HttpResponse
from django.shortcuts import render
from django import forms

from todolist.models import Project, Task


def index(request):
    project_list = Project.objects.all()
    return render(request, 'index.html', {
        'project_list': project_list,
    })


class NewTaskForm(forms.Form):
    parentID = forms.IntegerField()
    taskName = forms.CharField(max_length=200)


def add_task(request):
    if request.method == 'POST':
        form = NewTaskForm(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            parentID = form.cleaned_data['parentID']
            taskName = form.cleaned_data['taskName']
            p = Project.objects.get(id=parentID)
            t = Task(name=taskName, project=p, ddl="1970-01-01")
            t.save()
            resp = {}
            resp['parentID'] = parentID
            resp['id'] = t.id
            resp['name'] = t.name

            return HttpResponse(json.dumps(resp), mimetype="application/json")


class EditProjectForm(forms.Form):
    projectID = forms.IntegerField()
    projectName = forms.CharField(max_length=200)


def edit_project(request):
    if request.method == 'POST':
        form = EditProjectForm(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            projectID = form.cleaned_data['projectID']
            projectName = form.cleaned_data['projectName']
            p = Project.objects.get(id=projectID)
            p.name = projectName
            p.save()
            return HttpResponse(projectName)


class AddProjectForm(forms.Form):
    projectName = forms.CharField(max_length=200)


def add_project(request):
    if request.method == 'POST':
        form = AddProjectForm(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            projectName = form.cleaned_data['projectName']
            p = Project(name=projectName)
            p.save()

            resp = {}
            resp['id'] = p.id
            resp['name'] = p.name

            return HttpResponse(json.dumps(resp), mimetype="application/json")


def delete_project(request):
    if request.method == 'POST':
        projectID = request.POST['projectID']
        p = Project.objects.get(id=projectID)
        p.delete()
        return HttpResponse(projectID)


def delete_task(request):
    if request.method == 'POST':
        taskID = request.POST['taskID']
        t = Task.objects.get(id=taskID)
        t.delete()
        return HttpResponse(taskID)


class EditTaskForm(forms.Form):
    taskID = forms.IntegerField()
    taskName = forms.CharField(max_length=200)


def edit_task(request):
    if request.method == 'POST':
        form = EditTaskForm(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            taskID = form.cleaned_data['taskID']
            taskName = form.cleaned_data['taskName']
            t = Task.objects.get(id=taskID)
            t.name = taskName
            t.save()
            return HttpResponse(taskName)
