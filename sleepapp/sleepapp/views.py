import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated 
from rest_framework.views import APIView
from django.http import JsonResponse

from .models import SleepLog, SleepLogSerializer
from .validation import parse_and_validate_datetime, validate_feeling_field, validate_bed_time_sleep_interval

@api_view(['GET'])
def ping(request):
    return Response("pong")

class SleepLogView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        date = request.GET.get("date")
        parsed_date = parse_and_validate_datetime(date, "date")

        sleep_log = SleepLog.objects.filter(bed_time_end__date=parsed_date.date(), user_id=request.user.id).order_by("-id").first()
        serialized_obj = SleepLogSerializer(instance=sleep_log).data if sleep_log else None

        return JsonResponse(serialized_obj, safe=False)

    def post(self, request, *args, **kwargs):
        print(request.body)
        data = json.loads(request.body)

        bed_time_start = parse_and_validate_datetime(data["bedTimeStart"], "bedTimeStart")
        bed_time_end = parse_and_validate_datetime(data["bedTimeEnd"], "bedTimeEnd")
        feeling = validate_feeling_field(data["feeling"], "feeling")
        validate_bed_time_sleep_interval(bed_time_start, bed_time_end)

        sleep_log_item = SleepLog.objects.create(
            bed_time_start = bed_time_start,
            bed_time_end = bed_time_end,
            feeling = feeling,
            user_id = request.user.id
        )

        serialized_obj = SleepLogSerializer(instance=sleep_log_item).data
        return JsonResponse(serialized_obj, safe=False)
