from fastapi import FastAPI, HTTPException
from gimme import generate_branding_snippet, generate_keywords, validate_lenght
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

MAX_INPUT_LENGTH = 32
app = FastAPI()
handler = Mangum(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": []}


@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": None, "keywords": keywords}


@app.get("/generate_snippet_keywords")
async def generate_snippet_keywords_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": snippet, "keywords": keywords}


def validate_input_length(prompt: str):
    if not validate_lenght(prompt):
        raise HTTPException(status_code=400,
                            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH}.")
# uvicorn gimme_api:app --reload
