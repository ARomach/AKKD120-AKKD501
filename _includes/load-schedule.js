// Replace this URL with your Google Sheets CSV URL
const tsvUrl = 'https://docs.google.com/spreadsheets/d/1HD1PEagwwjoxwM8bffAiy-xf27-0su59zcFtJKmbs2Y/pub?gid=0&single=true&output=tsv';

// Function to fetch TSV data and convert it to an HTML table
async function loadTsvData() {
    try {
        console.log("Fetching TSV data...");
        const response = await fetch(tsvUrl);
        const tsvData = await response.text();
        console.log("TSV data fetched");

        const tableContainer = document.getElementById('table-container');
        tableContainer.innerHTML = convertTsvToHtmlTable(tsvData);
        console.log("Table inserted");
    } catch (error) {
        console.error('Error fetching TSV data:', error);
    }
}

// Function to convert TSV data to an HTML table
function convertTsvToHtmlTable(tsv) {
    const rows = tsv.split('\n').filter(row => row.trim() !== '');
    let tableHtml = '<table>';

    rows.forEach((row, rowIndex) => {
        const cells = row.split('\t');  // Use '\t' to split by tabs for TSV
        tableHtml += '<tr>';
        
        cells.forEach((cell, cellIndex) => {

            // Try to manually replace '\n-' with '<br>-'
            let cellContent = cell.trim();
            cellContent = cellContent.split(' -').join('<br>-');

            if (rowIndex === 0) {
                tableHtml += `<th>${cellContent}</th>`;
            } else {
                tableHtml += `<td>${cellContent}</td>`;
            }
        });
        
        tableHtml += '</tr>';
    });

    tableHtml += '</table>';
    return tableHtml;
}


// Load TSV data when the page loads
window.onload = loadTsvData;