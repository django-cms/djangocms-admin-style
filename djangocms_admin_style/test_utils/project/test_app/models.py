# -*- coding: utf-8 -*-
from django.db import models


class GenericFields(models.Model):
    char_field = models.CharField(max_length=255)
    integer_field = models.IntegerField()
    boolean_field = models.BooleanField()

    date_field = models.DateField()
    time_field = models.TimeField()
    date_time_field = models.DateTimeField()

    decimal_field = models.DecimalField(max_digits=20, decimal_places=5)
    float_field = models.FloatField()

    email_field = models.EmailField()
    file_field = models.FileField()
    file_path_field = models.FilePathField()
    generic_ip_address_field = models.GenericIPAddressField()
    slug_field = models.SlugField()
    text_field = models.TextField()
    url_field = models.URLField()
    foreign_key = models.ForeignKey('RelatedModel', related_name='+')
    many_to_many_field = models.ManyToManyField('RelatedModel', related_name='+')
    one_to_one_field = models.OneToOneField('RelatedModel', related_name='+')


class RelatedModel(models.Model):
    pass
