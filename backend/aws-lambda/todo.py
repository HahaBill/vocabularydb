from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()
handler = Mangum(app)


@app.get("/")
def root():
    return {"message": "Hello World from Todo API"}


# def handler():
#     return {"message": "Hello World from Todo API"}
