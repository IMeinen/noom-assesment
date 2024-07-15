import json
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated 
from rest_framework.views import APIView
from django.http import JsonResponse
from datetime import timedelta
from django.db.models import Q
import numpy as np


from .models import SleepLog, SleepLogSerializer
from .validation import parse_and_validate_datetime, validate_feeling_field, validate_bed_time_sleep_interval

@api_view(['GET'])
def ping(request):
    return Response("pong")

def minutes_to_12h_format(minutes):
    hours = int(minutes // 60) % 24
    minutes = int(minutes % 60)
    am_pm = "am" if hours < 12 else "pm"
    hours = hours if hours <= 12 else hours - 12
    return f"{hours}:{minutes:02d} {am_pm}"

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

    def delete(self, request, *args, **kwargs):
        SleepLog.objects.filter(user_id=request.user.id).delete()
        return Response(status=204)
    

@api_view(['GET'])
def monthly_logs( request ):
    try:
        date = request.GET.get("date")
        parsed_date = parse_and_validate_datetime(date, "date")

        last_day_of_month = parsed_date.replace(hour=23, minute=59, second=59)
 
        first_day_of_month = last_day_of_month - timedelta(days=30)
        
    except ValueError as e:
        return Response({"error": str(e)}, status=400)

    #Search all sleep logs for the user in the last 30 days
    sleep_logs = SleepLog.objects.filter(
        Q(bed_time_start__gte=first_day_of_month) & Q(bed_time_end__lte=last_day_of_month),
        user_id=request.user.id
    ).order_by("-id")

    bed_time_start_list = []
    bed_time_end_list = []
    slept_time_list = []
    feeling_count = {1: 0, 2: 0, 3: 0}

    for log in sleep_logs:
        
        # Calculate day difference, 
        # this logic exists because the post endpoint 
        # allows to have more than 24hours of sleep
        day_difference = (log.bed_time_end.date() - log.bed_time_start.date()).days

        # Calculate start and end minutes
        start_minutes = log.bed_time_start.hour * 60 + log.bed_time_start.minute
        end_minutes = log.bed_time_end.hour * 60 + log.bed_time_end.minute

        # Adjust end_minutes based on day_difference
        if day_difference > 0:
            end_minutes += day_difference * 24 * 60

        bed_time_start_list.append(start_minutes)
        bed_time_end_list.append(end_minutes)
        
        # Calculate the duration of sleep based on start and end times
        # If the end time is after the start time (same day), calculate the difference directly
        # If the end time is before the start time (crossed into the next day), add a day to the end time before calculating the difference
        slept_time = (log.bed_time_end - log.bed_time_start) if log.bed_time_end >= log.bed_time_start else (timedelta(days=1) + log.bed_time_end - log.bed_time_start)

        # Convert the slept time duration into hours
        slept_time_hours = slept_time.total_seconds() / 3600

        # Append the calculated hours of sleep to a list for further use or analysis
        slept_time_list.append(slept_time_hours)
        
        if log.feeling:
            feeling_count[log.feeling] += 1

    # Calculate the average start time in minutes from the bed_time_start_list, default to 0 if the list is empty
    average_bed_time_start_minutes = np.mean(bed_time_start_list) if bed_time_start_list else 0
    # Calculate the average end time in minutes from the bed_time_end_list, default to 0 if the list is empty
    average_bed_time_end_minutes = np.mean(bed_time_end_list) if bed_time_end_list else 0

    # Convert the average start time from minutes to a 12-hour format string
    average_bed_time_start = minutes_to_12h_format(average_bed_time_start_minutes)
    # Convert the average end time from minutes to a 12-hour format string
    average_bed_time_end = minutes_to_12h_format(average_bed_time_end_minutes)
    # Calculate the average slept time in hours from the slept_time_list, default to 0 if the list is empty
    average_slept_time = np.mean(slept_time_list) if slept_time_list else 0

    response_data = {
        'first_day_of_month': first_day_of_month,
        'last_day_of_month': last_day_of_month,
        'average_bed_time_start': average_bed_time_start,
        'average_bed_time_end': average_bed_time_end,
        'average_slept_time': average_slept_time,
        'feeling_count': feeling_count
    }

    return JsonResponse(response_data, status=200)