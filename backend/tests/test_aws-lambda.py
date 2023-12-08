from uuid import uuid4
import requests

ENDPOINT = "https://4k6jq6ypdpxyzmdnxul6i6y4ke0krgjw.lambda-url.us-east-1.on.aws/"


def test_can_create_and_get_task():
    user_id = f"user_{uuid4().hex}"
    random_task_content = f"user_{uuid4().hex}"
    create_response = create_task(user_id, random_task_content)
    assert create_response.status_code == 200

    task_id = create_response.json()["task"]["task_id"]
    task_response = get_task(task_id)
    assert task_response.status_code == 200

    task = task_response.json()
    assert task["user_id"] == user_id
    assert task["content"] == random_task_content


def create_task(user_id: str, content: str) -> dict:
    payload = {
        "user_id": user_id,
        "content": content,
    }
    return requests.put(f"{ENDPOINT}/create-task", json=payload)


def get_task(task_id: str) -> dict:
    return requests.get(f"{ENDPOINT}/get-task/{task_id}")
