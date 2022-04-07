import time
from locust import HttpUser, task
import json
import random


class QuickstartUser(HttpUser):
    cases = []
    with open('game_requests.json') as json_file:
        data = json.load(json_file)
        cases.extend(data)

    @task
    def run_game(self):
        time.sleep(1)
        response = self.client.post("/runGame", json=random.choice(self.cases))
        print(response.json())
