function loadContent(pageUrl) {
  fetch(pageUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error loading page: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("content").innerHTML = html;
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("content").innerHTML =
        "<p>Sorry, content could not be loaded.</p>";
    });
}
