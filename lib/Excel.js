let table = null;

const toCsv = function (table) {
  // Query all rows
  const rows = table.querySelectorAll("tr");

  return [].slice
    .call(rows)
    .map(function (row) {
      // Query all cells
      const cells = row.querySelectorAll("th,td");
      return [].slice
        .call(cells)
        .map(function (cell) {
          return cell.textContent;
        })
        .join(",");
    })
    .join("\n");
};

const download = function (text, fileName) {
  const link = document.createElement("a");
  link.setAttribute(
    "href",
    `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`
  );
  link.setAttribute("download", fileName);

  link.style.display = "none";
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

const useTable = function (id = null) {
  if (id) {
    table = document.getElementById(id);
  }
  table = document.getElementById("exportExcel");
  return this;
};

const exportCSV = function ({
  fileName = "download.csv",
  header = null,
  data = null,
}) {
  let csv = null;
  if (table) {
    csv = toCsv(table);
  } else {
    csv = header ? [header] : [];

    data.forEach((element) => {
      csv.push(typeof element === "object" ? Object.values(element) : element);
    });

    csv = csv.join("\n");
  }

  // Download it
  download(csv, fileName);
};

module.exports = { useTable, exportCSV };
