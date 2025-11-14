from django.contrib import admin
from .models import DisposalRecord

@admin.register(DisposalRecord)
class DisposalRecordAdmin(admin.ModelAdmin):
    list_display = ('id', 'truck_id', 'sector', 'scheduled_time', 'status')
    list_filter = ('status', 'sector')
    search_fields = ('truck_id', 'sector')
