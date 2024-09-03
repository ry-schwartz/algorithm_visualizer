from django.shortcuts import render
import random

def home(request):
    return render(request, 'base/home.html')

def search_view(request):
    size = 10
    speed = 2
    random_array = []

    if request.method == 'GET':
        size = int(request.GET.get('size', 10))
        speed = int(request.GET.get('speed', 2))
        random_array = sorted(random.sample(range(10, 51), size))
    
    context = {
        'size': size,
        'speed': speed,
        'random_array': random_array
        }
    
    return render(request, 'base/search.html', context)

def sort_view(request):
    size = 10
    speed = 2
    random_array = []

    if request.method == 'GET':
        size = int(request.GET.get('size', 10))
        speed = int(request.GET.get('speed', 2))
        random_array = random.sample(range(10, 51), size)
    
    context = {
        'size': size,
        'speed': speed,
        'random_array': random_array
        }
    
    return render(request, 'base/sort.html', context)

def shortest_path_view(request):
    difficulty = 'easy'
    speed = 2

    if request.method == 'GET':
        difficulty = str(request.GET.get('difficulty', 'easy'))
        speed = int(request.GET.get('speed', 2))

        context = {
        'difficulty': difficulty,
        'speed': speed
        }

    return render(request, 'base/shortest_path.html', context)