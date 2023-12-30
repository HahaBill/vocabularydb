import os
import time
import boto3
from boto3.dynamodb.conditions import Key
from uuid import uuid4
from fastapi import FastAPI, HTTPException
from mangum import Mangum
from pydantic import BaseModel
from typing import Optional

app = FastAPI()
handler = Mangum(app)


class PutVocabularyRequest(BaseModel):
    vocab_definition: str
    vocab_example: str
    vocab_name: str
    user_id: Optional[str] = None
    vocab_id: Optional[str] = None
    isLearned: bool = False


@app.get("/")
def root():
    return {"message": "Welcome to VocabularyDB"}


@app.put("/create-vocab")
async def create_vocabulary(put_vocab_request: PutVocabularyRequest):
    created_time = int(time.time())
    item = {
        "user_id": put_vocab_request.user_id,
        "vocab_definition": put_vocab_request.vocab_definition,
        "vocab_example": put_vocab_request.vocab_example,
        "vocab_name": put_vocab_request.vocab_name,
        "isLearned": False,
        "created_time": created_time,
        "vocab_id": f"vocabulary_{uuid4().hex}",
        "ttl": int(created_time + 86400),  # Expire after 24 hours
    }

    table = _get_table()
    table.put_item(Item=item)
    return {"vocabulary": item}


@app.get("/get-vocabulary/{vocabulary_id}")
async def get_vocabulary(vocabulary_id: str):
    table = _get_table()
    response = table.get_item(Key={"vocab_id": vocabulary_id})
    item = response.get("Item")

    if not item:
        raise HTTPException(
            status_code=404, detail=f"Vocabulary {vocabulary_id} not found"
        )
    return item


@app.get("/list-vocabulary-learned/{user_id}")
async def list_tasks(user_id: str):
    table = _get_table()
    response = table.query(
        IndexName="user-index",
        KeyConditionExpression=Key("user_id").eq(user_id),
        ScanIndexForward=False,
        Limit=10,
    )
    vocabularies = response.get("Items")
    return {"vocabularies": vocabularies}


@app.put("/update-vocabulary")
async def update_task(put_vocab_request: PutVocabularyRequest):
    table = _get_table()
    table.update_item(
        Key={"vocabulary_id": put_vocab_request.vocab_id},
        UpdateExpression="SET vocab_definition = :vocab_definition, isLearned = :isLearned, vocab_example = :vocab_example, vocab_name = :vocab_name",
        ExpressionAttributeValues={
            ":vocab_definition": put_vocab_request.vocab_definition,
            ":isLearned": put_vocab_request.isLearned,
            ":vocab_example": put_vocab_request.vocab_example,
            ":vocab_name": put_vocab_request.vocab_example,
        },
        ReturnValues="ALL_NEW",
    )
    return {"update_task_id": put_vocab_request.task_id}


@app.delete("/delete-vocab/{vocab_id}")
async def delete_task(vocab_id: str):
    table = _get_table()
    table.delete_item(Key={"vocab_id": vocab_id})
    return {"deleted_task_id": vocab_id}


def _get_table():
    table_name = os.environ.get("TABLE_NAME")
    return boto3.resource("dynamodb").Table(table_name)
