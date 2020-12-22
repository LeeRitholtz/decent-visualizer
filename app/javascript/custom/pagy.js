function pagyRequest() {
  const pagy = document.getElementById("pagy")
  const response = JSON.parse(this.responseText)
  pagy.innerHTML += response.html

  const loadMoreLink = document.getElementById("pagy-load-more")
  document.getElementById("pagy-loader").classList.add("d-none")
  if (response.next !== null) {
    loadMoreLink.dataset.page = response.next
    loadMoreLink.classList.remove("d-none")
  } else {
    loadMoreLink.parentNode.parentNode.removeChild(loadMoreLink.parentNode);
  }
}

function loadNextPage(page, params) {
  const loc = window.location
  let queryParams = new URLSearchParams(loc.search)
  if (params !== null && Object.keys(params).length > 0) {
    Object.keys(params).forEach(function (key) {
      queryParams.set(key, params[key])
    })
  }
  queryParams.set("page", page)

  const url = loc.origin + loc.pathname + "?" + queryParams.toString()
  let req = new XMLHttpRequest()
  req.addEventListener("load", pagyRequest)
  req.open("GET", url)
  req.send()
}

function loadMore(event) {
  event.preventDefault()
  event.target.classList.add("d-none")
  document.getElementById("pagy-loader").classList.remove("d-none")
  const data = event.target.dataset
  loadNextPage(data.page, JSON.parse(data.params))
}

document.addEventListener("turbolinks:load", function (xhr) {
  if (document.getElementById("pagy-load-more")) {
    document.getElementById("pagy-load-more").addEventListener("click", loadMore)
  }
})