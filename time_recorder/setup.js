function onClickAddButton() {
  var title = document.getElementById("title").value;
  var datetime = document.getElementById("datetime").value;
  chrome.storage.local.get(storageKey).then((values) => {
    /**
     * {
     *   datetimes: [{
     *     title: string,
     *     datetime: string,
     *   }]
     * }
     */
    const data = values[storageKey];
    const datetimes = data.datetimes || [];
    datetimes.push({ title, datetime });
    chrome.storage.local.set({ [storageKey]: { datetimes } }).then(() => {
      showDatetimeList();
    });
  })
}

function onClickClearButton() {
  chrome.storage.local.set({ [storageKey]: { datetimes: [] } }).then(() => {
    showDatetimeList();
  });
}

function showDatetimeList() {
  chrome.storage.local.get(storageKey).then((values) => {
    const data = values[storageKey];
    const datetimes = data.datetimes || [];
    const datetimeLiList = datetimes.map((datetime) => {
      return `<li>${datetime.title}: ${datetime.datetime}</li>`;
    });
    document.getElementById("datetime-list").innerHTML = `<ul>${datetimeLiList.join('')}</ul>`;
  });
}

const storageKey = 'time_recorder';
document.addEventListener("DOMContentLoaded", function () {
  // add-button
  document
    .getElementById("add-button")
    .addEventListener("click", onClickAddButton);

  // clear-button
  document
    .getElementById("clear-button")
    .addEventListener("click", onClickClearButton);

  // datetime
  document.getElementById("datetime").value = new Date().toISOString().slice(0, 16);

  // refresh dom
  showDatetimeList();
});
