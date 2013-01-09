from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=200)
    
    def __unicode__(self):
        return self.name

class Task(models.Model):
    project = models.ForeignKey(Project)
    name = models.CharField(max_length=200)
    ddl = models.DateField('DeadLine')
    
    def __unicode__(self):
        return "%s %s" % (self.name, self.ddl)
    

    
     
