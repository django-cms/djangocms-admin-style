# -*- coding: utf-8 -*-
from django.contrib import admin
from easy_select2 import select2_modelform

from . import models


class TestFieldsGrouping1Admin(admin.ModelAdmin):
    fields = (
        'date_field_1',
        ('date_field_2', 'foreign_key'),
    )



class TestEasySelectAdmin(admin.ModelAdmin):
    form = select2_modelform(models.TestEasySelect)


admin.site.register(models.TestGenericFields)
admin.site.register(models.TestFieldsGrouping1, TestFieldsGrouping1Admin)
admin.site.register(models.TestEasySelect, TestEasySelectAdmin)
