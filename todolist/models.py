from django.db import models

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length = 200)
    
    def __unicode__(self):
        return self.name

class Task(models.Model):
    project = models.ForeignKey(Project)
    name = models.CharField(max_length = 200)
    ddl = models.DateField('DeadLine')
    
    def __unicode__(self):
        return self.name + ' ' + str(self.ddl)
    

    
     
