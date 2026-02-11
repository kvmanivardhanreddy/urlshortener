async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const errorEl = document.getElementById("error");
    const resultDiv = document.getElementById("result");
    const shortUrlSpan = document.getElementById("shortUrl");

    errorEl.textContent = "";
    resultDiv.classList.add("hidden");

    try {
        const response = await fetch("/api/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ longUrl })
        });

        const data = await response.json();

        if (!response.ok) {
            errorEl.textContent = data.error;
            return;
        }

        shortUrlSpan.textContent = data.shortUrl;
        resultDiv.classList.remove("hidden");

    } catch (err) {
        errorEl.textContent = "Something went wrong.";
    }
}

function copyUrl() {
    const shortUrl = document.getElementById("shortUrl").textContent;
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
}
