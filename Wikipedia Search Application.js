let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let loading = document.getElementById("loading");
let url = "https://apis.ccbp.in/wiki-search?search=";

function displayTheContent(items) {
    loading.classList.add("d-none");
    let {
        description,
        link,
        title
    } = items;

    let divEl = document.createElement("div");
    divEl.classList.add("result-item");

    let a_El = document.createElement("a");
    a_El.classList.add("result-title");
    a_El.href = link;
    a_El.textContent = title;
    a_El.target = "_blank";
    divEl.appendChild(a_El);

    let lineBreak = document.createElement("br");
    divEl.appendChild(lineBreak);

    let a_E2 = document.createElement("a");
    a_E2.textContent = link;
    a_E2.target = "_blank";
    a_E2.href = link;
    a_E2.classList.add("result-url");
    divEl.appendChild(a_E2);

    let lineBreak2 = document.createElement("br");
    divEl.appendChild(lineBreak2);

    let para = document.createElement("p");
    para.textContent = description;
    para.classList.add("link-description");
    divEl.appendChild(para);

    searchResults.appendChild(divEl);
}

function getTheDocument(event) {
    if (event.key === "Enter") {
        searchResults.textContent = null;
        loading.classList.remove("d-none");
        let InputValue = searchInput.value;
        let new_URL = url + InputValue;
        let option = {
            method: "GET"
        };
        fetch(new_URL, option)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                for (let items of search_results) {
                    displayTheContent(items);
                }
            });
    }
}

searchInput.addEventListener("keydown", getTheDocument);