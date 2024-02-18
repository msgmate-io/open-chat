from rest_framework import viewsets, status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import response
from rest_framework.pagination import PageNumberPagination
from dataclasses import dataclass
from typing import OrderedDict
from rest_framework import serializers
from drf_spectacular.utils import extend_schema
from rest_framework_dataclasses.serializers import DataclassSerializer
from dataclasses import field


@dataclass
class PaginatedResponseDataBase:
    page_size: int = 5
    pages_total: int = 1
    items_total: int = 1
    next_page: int = None
    previous_page: int = None
    first_page: int = 1

@dataclass
class PaginatedResponseData(PaginatedResponseDataBase):
    results:list = field(default_factory=list) 
    
    def dict(self):
        return self.__dict__.copy()
    
class PaginatedResponseSerializer(DataclassSerializer):
    class Meta:
        dataclass = PaginatedResponseData

class AugmentedPagination(PageNumberPagination):
    page_size = 5
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 40
    
    def get_paginated_response(self, data, **kwargs):
        return response.Response(PaginatedResponseData(
            page_size=self.page_size,
            pages_total=self.page.paginator.num_pages,
            items_total=self.page.paginator.count,
            first_page=1,
            results=data,
            next_page=self.page.next_page_number() if self.page.has_next() else None,
            previous_page=self.page.previous_page_number() if self.page.has_previous() else None,
        ).dict())
        
    
    def get_paginated_response_schema(self, schema):

        return {
            'type': 'object',
            'properties': {
                'page_size': {
                    'type': 'integer',
                    'example': '40',
                    'description': 'The number of items per page',
                    'format': 'int32'
                },
                'pages_total': {
                    'type': 'integer',
                    'example': '1',
                    'description': 'The total number of pages',
                    'format': 'int32'
                },
                'items_total': {
                    'type': 'integer',
                    'example': '1',
                    'description': 'The total number of items',
                    'format': 'int32'
                },
                'next_page': {
                    'type': 'integer',
                    'example': '2',
                    'description': 'The next page number',
                    'format': 'int32'
                },
                'previous_page': {
                    'type': 'integer',
                    'example': '1',
                    'description': 'The previous page number',
                    'format': 'int32'
                },
                'first_page': {
                    'type': 'integer',
                    'example': '1',
                    'description': 'The first page number',
                    'format': 'int32'
                },
                'results': schema,
            },
        }

class DetailedPaginationMixin(AugmentedPagination):
    pass

class UserStaffRestricedModelViewsetMixin:
    
    @classmethod
    def emulate(cls, request, **kwargs):
        obj = cls()
        obj.request = request
        obj.format_kwarg = None
        
        cls.kwargs = {**cls.kwargs, **kwargs}
        
        def pop_data(function) -> dict:
            def wrapper(*args, **kwargs):
                kwargs['request'] = request
                return function(*args, **kwargs).data
            return wrapper
        
        POP_FUNCS = ["list", "retrieve", "create", "update", "partial_update", "destroy"]
        for func in POP_FUNCS:
            if hasattr(obj, func):
                setattr(obj, func, pop_data(getattr(obj, func)))
        return obj
    
    def check_unallowed_args(self, kwargs):
        res = []
        for item in kwargs:
            if not item in self.user_editable:
                res.append(item)
        return res
    
    def get_object(self):
        if not self.request.user.is_staff:
            self.kwargs["pk"] = self.request.user.id
        else:
            if not "pk" in self.kwargs:
                self.kwargs["pk"] = self.request.user.id
                
        if isinstance(self.kwargs["pk"], int):
            return super().get_object()
        elif self.kwargs["pk"].isnumeric():
            self.kwargs["pk"] = int(self.kwargs["pk"])
            # assume uuid
            return super().get_object()
        else:
            return super().get_queryset().get(uuid=self.kwargs["pk"])

    def update(self, request, *args, **kwargs):
        if not request.user.is_staff:
            unallowed_args = self.check_unallowed_args(request.data)
            if len(unallowed_args) > 0:
                return response.Response({arg: "Not User editable" for arg in unallowed_args},status=status.HTTP_400_BAD_REQUEST)
        return super().update(request, *args, **kwargs)

    def get_queryset(self):
        if not self.request.user.is_staff:
            return super().get_queryset().filter(user=self.request.user)
        else:
            return super().get_queryset()
        
    def get_permissions(self):
        if self.action == 'list' and (not self.allow_user_list):
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
