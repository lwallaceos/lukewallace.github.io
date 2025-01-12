function moveToTopAndLoadContent(pageUrl) {
  const centeredContent = document.getElementById("centered-content");
  const contentDiv = document.getElementById("content");

  if (!centeredContent.classList.contains("to-top")) {
    centeredContent.classList.add("to-top");
  }

  fetch(pageUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error loading page: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      contentDiv.innerHTML = html;
      contentDiv.classList.add("visible");
    })
    .catch((error) => {
      console.error(error);
      contentDiv.innerHTML = "<p>Sorry, content could not be loaded.</p>";
      contentDiv.classList.add("visible");
    });
}
