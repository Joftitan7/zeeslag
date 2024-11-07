async function attack(cellId) {
    const apiSecret = localStorage.getItem('apiSecret');
    if (!apiSecret) {
        console.warn("No secret found.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/attack`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                secret: apiSecret,
                position: cellId
            })
        });

        if (response.ok) {
            alert(`Attack sent to ${cellId}`);
        } else {
            alert("Attack failed.");
        }
    } catch (error) {
        console.error("Error attacking:", error);
    }
}
