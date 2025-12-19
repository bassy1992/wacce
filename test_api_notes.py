import requests
import json

# Test if API returns notes
API_URL = 'http://localhost:8000/api/courses'

print("Testing API for Lesson Notes")
print("=" * 60)

# Get English Language subject (ID 1)
try:
    response = requests.get(f'{API_URL}/subjects/1/')
    
    if response.status_code == 200:
        data = response.json()
        print(f"✓ API Response: {response.status_code}")
        print(f"Subject: {data.get('name')}")
        print(f"Topics: {len(data.get('topics', []))}")
        
        if data.get('topics'):
            first_topic = data['topics'][0]
            print(f"\nFirst Topic: {first_topic.get('title')}")
            print(f"Lessons: {len(first_topic.get('lessons', []))}")
            
            if first_topic.get('lessons'):
                first_lesson = first_topic['lessons'][0]
                print(f"\nFirst Lesson: {first_lesson.get('title')}")
                print(f"Has 'notes' field: {'notes' in first_lesson}")
                
                if 'notes' in first_lesson:
                    notes = first_lesson.get('notes', '')
                    print(f"Notes length: {len(notes)} characters")
                    if notes:
                        print(f"\nFirst 200 characters:")
                        print("-" * 60)
                        print(notes[:200])
                        print("-" * 60)
                    else:
                        print("⚠ Notes field exists but is empty!")
                else:
                    print("✗ 'notes' field NOT in API response!")
                    print("\nLesson fields:", list(first_lesson.keys()))
    else:
        print(f"✗ API Error: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"✗ Error: {e}")

print("\n" + "=" * 60)
