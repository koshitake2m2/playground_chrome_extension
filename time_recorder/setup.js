const storageKey = "time_recorder";

/**
 * @returns {Promise<{
 *   tmpTime?: {
 *     title: string,
 *     startAt: string,
 *   },
 *   timeList: {
 *     title: string,
 *     startAt: string,
 *     endAt: string,
 *   }[]
 * }>}
 */
async function getTimeList() {
  const values = await chrome.storage.local.get(storageKey);
  return values[storageKey] || { timeList: [] };
}

/**
 * @param {{
 *   tmpTime?: {
 *     title: string,
 *     startAt: string,
 *   },
 *   timeList: {
 *     title: string,
 *     startAt: string,
 *     endAt: string,
 *   }[]
 * }} data
 * @returns {Promise<void>}
 */
async function setTimeList(data) {
  return chrome.storage.local.set({ [storageKey]: data });
}

/**
 * @returns {string} e.g. '00:00'
 */
function getNowTimeStr() {
  return new Date().toISOString().slice(11, 16);
}

async function onClickStartButton() {
  const title = document.getElementById("title").value;
  document.getElementById("title").value = "";
  const startAt = getNowTimeStr();
  const data = await getTimeList();
  data.tmpTime = { title, startAt };
  await setTimeList(data);

  refreshDom();
}

async function onClickEndButton() {
  const endAt = getNowTimeStr();
  const data = await getTimeList();
  const newTime = {
    title: data.tmpTime.title,
    startAt: data.tmpTime.startAt,
    endAt,
  };
  data.tmpTime = undefined;
  if (!data.timeList) {
    data.timeList = [];
  }
  data.timeList.push(newTime);
  await setTimeList(data);
  refreshDom();
}

async function onClickClearButton() {
  const data = {
    tmpTime: undefined,
    timeList: [],
  };
  await setTimeList(data);
  refreshDom();
}

/**
 * @param {{
 *   title: string,
 *   startAt: string,
 *   endAt: string,
 * }} time
 * @param {number} index
 * @returns {Promise<void>}
 */
async function onClickEditButton(time, index) {
  const data = await getTimeList();
  document.getElementById("edit-form").hidden = false;
  document.getElementById("edit-index").value = index;
  document.getElementById("edit-title").value = time.title;
  document.getElementById("edit-start-at").value = time.startAt;
  document.getElementById("edit-end-at").value = time.endAt;
}

async function onClickEditDoneButton() {
  const index = document.getElementById("edit-index").value;
  const title = document.getElementById("edit-title").value;
  const startAt = document.getElementById("edit-start-at").value;
  const endAt = document.getElementById("edit-end-at").value;
  const data = await getTimeList();
  const newTime = { title, startAt, endAt };
  data.timeList[index] = newTime;
  await setTimeList(data);
  document.getElementById("edit-form").hidden = true;
  refreshDom();
}

/**
 * @param {string} csvStr
 */
function downloadCsv(csvStr) {
  // byte order mark. Unicodeで符号化されていることを示す. 以下はUTF-8.
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([bom, csvStr], { type: "text/csv" });
  const url = (window.URL || window.webkitURL).createObjectURL(blob);
  const anchor = document.createElement("a");
  const today = new Date().toISOString().slice(0, 10);
  anchor.download = `time_recorder_${today}.csv`;
  anchor.href = url;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  (window.URL || window.webkitURL).revokeObjectURL(url);

  blob.text().then((r) => console.log(r));
}

async function onClickCsvButton() {
  const data = await getTimeList();
  const timeList = data.timeList || [];
  const csvHeader = "title,startAt,endAt";
  const csvBody = timeList.map((time) => {
    return `"${time.title}","${time.startAt}","${time.endAt}"`;
  });
  const csvStr = [csvHeader, ...csvBody].join("\n");
  console.log(csvStr);
  downloadCsv(csvStr);
}

async function refreshDom() {
  const data = await getTimeList();
  if (data.tmpTime === undefined) {
    document.getElementById("start-form").hidden = false;
    document.getElementById("end-form").hidden = true;
  } else {
    document.getElementById("start-form").hidden = true;
    document.getElementById("end-form").hidden = false;
    document.getElementById("tmp-title").innerHTML = data.tmpTime.title;
    document.getElementById("tmp-start-at").innerHTML = data.tmpTime.startAt;
  }

  const timeListLiList = (data.timeList ?? []).map((time, i) => {
    return `<tr>
      <td>${time.title}</td>
      <td>${time.startAt}</td>
      <td>${time.endAt}</td>
      <td><button type="button" id="edit-button-${i}">Edit</button></td>
    </tr>`;
  });
  const timeListUl = `<table>
    <tr>
      <th>Title</th>
      <th>StartAt</th>
      <th>EndAt</th>
      <th>Action</th>
    </tr>
    ${timeListLiList.join("")}
  </table>`;

  document.getElementById("time-list").innerHTML = timeListUl;
  (data.timeList ?? []).forEach((time, i) => {
    document
      .getElementById(`edit-button-${i}`)
      .addEventListener("click", () => onClickEditButton(time, i));
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // start-button
  document
    .getElementById("start-button")
    .addEventListener("click", onClickStartButton);
  // end-button
  document
    .getElementById("end-button")
    .addEventListener("click", onClickEndButton);
  // clear-button
  document
    .getElementById("clear-button")
    .addEventListener("click", onClickClearButton);

  // edit-form
  document.getElementById("edit-form").hidden = true;
  // edit-done-button
  document
    .getElementById("edit-done-button")
    .addEventListener("click", onClickEditDoneButton);

  // csv-button
  document
    .getElementById("csv-button")
    .addEventListener("click", onClickCsvButton);

  // refresh dom
  refreshDom();
});
