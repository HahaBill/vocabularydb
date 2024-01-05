import os
import time
import boto3
from boto3.dynamodb.conditions import Key
from uuid import uuid4
from fastapi import FastAPI, HTTPException
from mangum import Mangum
from pydantic import BaseModel
from typing import Optional
from routers import api

app = FastAPI()
handler = Mangum(app)
app.include_router(api.router)
