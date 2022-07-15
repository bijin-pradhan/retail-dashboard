async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    try {
        const formData = new FormData(form)

        const response = await postFormDataAsJson({ url, formData });

        for (var key in response) {
            sessionStorage.setItem(key, response[key])
        }

        window.location.href = '/'
    }
    catch (error) {
        console.error(error);
    }
}

async function postFormDataAsJson({ url, formData }) {
    const data = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(data)

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

const formElement = document.querySelector("form")
formElement.addEventListener("submit", handleSubmit)