const stores = [ 
  "Coles",
  "Woolworths",
  "Target",
  "David Jones",
  "Big W"
];

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const storeList = document.getElementById("storeList");

searchButton.addEventListener("click", searchStores);

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchStores();
  }
});

function searchStores() {
  const searchTerm = searchInput.value.toLowerCase();
  const matchingStores = stores.filter(store =>
    store.toLowerCase().includes(searchTerm)
  );

  displayStores(matchingStores);
}

function displayStores(stores) {
  storeList.innerHTML = "";

  if (stores.length === 0) {
    const listItem = document.createElement("li");
    listItem.textContent = "No stores found.";
    storeList.appendChild(listItem);
  } else {
    stores.forEach(store => {
      const listItem = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = store;
      button.addEventListener("click", () => {
        console.log(store);
      });
      listItem.appendChild(button);
      storeList.appendChild(listItem);
    });
  }
}