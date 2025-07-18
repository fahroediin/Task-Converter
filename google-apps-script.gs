/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of authorization,
 * asking for permission only to the current spreadsheet.
 */

/**
 * Creates a custom menu in the spreadsheet UI.
 * This function is automatically called when the spreadsheet is opened.
 */
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('Task Converter')
      .addItem('Import Task Log...', 'showImportDialog')
      .addToUi();
}

/**
 * Displays an HTML dialog to get user input for the task log and target cell.
 */
function showImportDialog() {
  const html = HtmlService.createHtmlOutputFromFile('dialog.html')
      .setWidth(500)
      .setHeight(450);
  SpreadsheetApp.getUi().showModalDialog(html, 'Import Task Log');
}

/**
 * A global map to convert month names (Indonesian) to numbers.
 */
const MONTH_MAP = {
  'januari': '01', 'februari': '02', 'maret': '03', 'april': '04', 'mei': '05', 'juni': '06',
  'juli': '07', 'agustus': '08', 'september': '09', 'oktober': '10', 'november': '11', 'desember': '12'
};

/**
 * Summarizes a task description by truncating it at the first delimiter.
 * @param {string} fullDescription The full task description.
 * @return {string} A summarized version of the task.
 */
function summarizeTask(fullDescription) {
    const delimiters = ['(', ',', ' untuk ', ' dengan detail', '(detail'];
    let bestIndex = -1;
    for (const delimiter of delimiters) {
        const index = fullDescription.indexOf(delimiter);
        if (index !== -1 && (bestIndex === -1 || index < bestIndex)) {
            bestIndex = index;
        }
    }
    return bestIndex !== -1 ? fullDescription.substring(0, bestIndex).trim() : fullDescription;
}

/**
 * Parses a date string like "17 - Juli - 2025" into "YYYY-MM-DD" format.
 * @param {string} dateString The date string to parse.
 * @return {string} The date in ISO format (YYYY-MM-DD).
 */
function parseDate(dateString) {
    const parts = dateString.split('-').map(p => p.trim().toLowerCase());
    const day = parts[0].padStart(2, '0');
    const month = MONTH_MAP[parts[1]];
    const year = parts[2];
    return `${year}-${month}-${day}`;
}

/**
 * Formats an ISO date string ("YYYY-MM-DD") into "DD Month YYYY" format.
 * @param {string} isoDate The date string in ISO format.
 * @return {string} The formatted date string.
 */
function formatDate(isoDate) {
    if (!isoDate || isoDate === '-') return '-';
    const [year, month, day] = isoDate.split('-');
    const monthName = Object.keys(MONTH_MAP).find(key => MONTH_MAP[key] === month);
    return `${day} ${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;
}

/**
 * Processes the raw text log and inserts the structured data into the active sheet.
 * This is the main server-side function called from the dialog.
 *
 * @param {object} data An object containing `logText` and `targetCell`.
 * @return {string} A success or error message.
 */
function processAndInsertData(data) {
  const { logText, targetCell } = data;

  if (!logText || !logText.trim()) {
    return "Error: Input text cannot be empty.";
  }
  if (!targetCell || !/^[A-Z]+[1-9][0-9]*$/.test(targetCell)) {
    return "Error: Invalid cell coordinate. Please use format like 'A1'.";
  }

  // --- Core Logic from original project ---
  const lines = logText.split('\n');
  const dailyTasks = {};
  let currentDate = null, currentPIC = null;

  for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('=')) continue;
      const dateMatch = trimmedLine.match(/^(\d{1,2})\s*-\s*([a-zA-Z]+)\s*-\s*(\d{4})$/);
      if (dateMatch) {
          currentDate = parseDate(trimmedLine);
          if (!dailyTasks[currentDate]) dailyTasks[currentDate] = {};
          currentPIC = null; continue;
      }
      const picMatch = trimmedLine.match(/^\d+\.\s*(.+)$/);
      if (picMatch) {
          currentPIC = picMatch[1].trim();
          if (currentDate && !dailyTasks[currentDate][currentPIC]) dailyTasks[currentDate][currentPIC] = [];
          continue;
      }
      const taskMatch = trimmedLine.match(/^-+\s*(.+)$/);
      if (taskMatch && currentDate && currentPIC) {
          dailyTasks[currentDate][currentPIC].push(taskMatch[1].trim());
      }
  }
  
  const allTasks = new Map();
  const sortedDates = Object.keys(dailyTasks).sort();
  
  if (sortedDates.length === 0) {
    return "Error: No valid tasks found. Check input format.";
  }

  for (const date of sortedDates) {
      for (const pic in dailyTasks[date]) {
          for (const task of dailyTasks[date][pic]) {
              const taskKey = `${pic}:${task}`;
              if (!allTasks.has(taskKey)) {
                  allTasks.set(taskKey, { startDate: date, lastSeenDate: date });
              } else {
                  allTasks.get(taskKey).lastSeenDate = date;
              }
          }
      }
  }

  const header = ['Task', 'Description', 'PIC', 'Status', 'Start Date', 'End Date'];
  const outputRows = [header];
  const lastDate = sortedDates[sortedDates.length - 1];
  
  for (const [taskKey, dates] of allTasks.entries()) {
      const [pic, fullDescription] = taskKey.split(':', 2);
      const { startDate, lastSeenDate } = dates;
      
      const shortTask = summarizeTask(fullDescription);
      let status = 'In Progress';
      let endDate = '-';

      if (lastSeenDate < lastDate) {
          status = 'Done';
          const lastSeenDateIndex = sortedDates.indexOf(lastSeenDate);
          endDate = sortedDates[lastSeenDateIndex + 1];
      }

      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      
      outputRows.push([shortTask, fullDescription, pic, status, formattedStartDate, formattedEndDate]);
  }
  // --- End of Core Logic ---

  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const startRange = sheet.getRange(targetCell);
    const endRange = sheet.getRange(startRange.getRow(), startRange.getColumn(), outputRows.length, outputRows[0].length);
    
    // Clear previous content in the target range to avoid leftover data
    endRange.clearContent();
    
    // Set the new values
    sheet.getRange(startRange.getRow(), startRange.getColumn(), outputRows.length, outputRows[0].length).setValues(outputRows);
    
    return `Success! ${outputRows.length - 1} tasks inserted at ${targetCell}.`;
  } catch (e) {
    Logger.log(e);
    return `Error: Could not write to sheet. ${e.message}`;
  }
}
