from fastapi import APIRouter

from . import vocab_crud

router = APIRouter()
router.include_router(vocab_crud.router, prefix="/vocab_crud", tags=["vocab_crud"])
