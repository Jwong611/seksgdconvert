from fastapi import FastAPI, Query, HTTPException

app = FastAPI(title="Converter API")

# Example fixed rate. Replace with a live rate source if you want.
SEK_TO_SGD = 0.12  # 1 SEK = 0.12 SGD


@app.get("/")
def root():
    return {"message": "Converter API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/convert")
def convert(
    amount: float = Query(..., gt=0),
    from_currency: str = Query(..., pattern="^(SEK|SGD)$"),
    to_currency: str = Query(..., pattern="^(SEK|SGD)$"),
):
    if from_currency == to_currency:
        return {
            "amount": amount,
            "from": from_currency,
            "to": to_currency,
            "rate": 1.0,
            "result": amount,
        }

    if from_currency == "SEK" and to_currency == "SGD":
        rate = SEK_TO_SGD
        result = amount * rate
    elif from_currency == "SGD" and to_currency == "SEK":
        rate = 1 / SEK_TO_SGD
        result = amount * rate
    else:
        raise HTTPException(status_code=400, detail="Unsupported currency pair")

    return {
        "amount": amount,
        "from": from_currency,
        "to": to_currency,
        "rate": rate,
        "result": round(result, 4),
    }
