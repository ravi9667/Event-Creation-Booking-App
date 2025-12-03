const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return token;
}

// Login and signup api
export const postRequest = async (route, bodyData) => {
    try {
        const res = await fetch(`${route}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData),
        });

        const data = await res.json();
        return data;

    } catch (err) {
        console.log("POST API Error:", err);
        return { ok: false, message: "Something went wrong" };
    }
};