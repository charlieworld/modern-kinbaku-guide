import { google } from 'googleapis';
import pkg from 'lodash';
const { get } = pkg;

const SHEET_ID = '19CPChJ_GGOMJm4EUfggEQpOhAw23qK7EBD1WuamptBE';
const RANGE = '表單回應!A:F';

const HEADER_KEYS = [
  'createdAt',
  'donateAmount',
  'name',
  'email',
  'comment',
  'remark',
];

function formatData(data) {
  if (!data.length) return [];
  data.shift();
  const outputData = [];
  
  data.forEach((item, classIndex) => {
    const tObj = {};
    HEADER_KEYS.forEach((key, index) => {
      tObj[key] = item[index];
    });
    outputData.push(tObj);
  });
  return outputData;
}

export default async function loadData() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: 'v4', auth: client });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: SHEET_ID,
    range: RANGE,
  });
  const data = get(getRows, 'data.values', []);
  return formatData(data);
}
