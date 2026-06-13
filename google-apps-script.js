/**
 * ============================================================
 * KAFF Kitchen — Google Apps Script (Google Sheets Integration)
 * ============================================================
 * 
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://script.google.com while logged in as Kaffkitchenappliances@gmail.com
 * 2. Click "New project"
 * 3. Delete the existing code and paste this entire file's contents
 * 4. Name the project "KAFF Enquiries"
 * 5. Click Deploy > New deployment
 * 6. Select type: "Web app"
 * 7. Set "Execute as": "Me (Kaffkitchenappliances@gmail.com)"
 * 8. Set "Who has access": "Anyone"
 * 9. Click Deploy and authorize the app
 * 10. Copy the Web app URL and paste it in script.js where indicated
 *     (search for GOOGLE_APPS_SCRIPT_URL)
 * 
 * The script will automatically create a "KAFF_Enquiries" spreadsheet
 * in the Google Drive of Kaffkitchenappliances@gmail.com
 * ============================================================
 */

// Sheet name constants
var SHEET_NAME_ENQUIRIES = 'Cart Enquiries';
var SHEET_NAME_CONTACTS = 'Contact Form';
var SHEET_NAME_NEWSLETTER = 'Newsletter';
var SPREADSHEET_NAME = 'KAFF_Enquiries';

/**
 * Get or create the master spreadsheet
 */
function getOrCreateSpreadsheet() {
  var files = DriveApp.getFilesByName(SPREADSHEET_NAME);
  var ss;
  
  if (files.hasNext()) {
    ss = SpreadsheetApp.open(files.next());
  } else {
    ss = SpreadsheetApp.create(SPREADSHEET_NAME);
    
    // Set up Cart Enquiries sheet
    var enquirySheet = ss.getActiveSheet();
    enquirySheet.setName(SHEET_NAME_ENQUIRIES);
    enquirySheet.appendRow([
      'Timestamp', 'Name', 'Phone', 'Email', 'Subject',
      'Cart Items', 'Total Amount', 'Full Message', 'Source'
    ]);
    enquirySheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#D4AF37').setFontColor('#000000');
    enquirySheet.setFrozenRows(1);
    
    // Set up Contact Form sheet
    var contactSheet = ss.insertSheet(SHEET_NAME_CONTACTS);
    contactSheet.appendRow([
      'Timestamp', 'Name', 'Phone', 'Email', 'Subject', 'Message', 'Source'
    ]);
    contactSheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#D4AF37').setFontColor('#000000');
    contactSheet.setFrozenRows(1);
    
    // Set up Newsletter sheet
    var newsletterSheet = ss.insertSheet(SHEET_NAME_NEWSLETTER);
    newsletterSheet.appendRow(['Timestamp', 'Email', 'Source']);
    newsletterSheet.getRange(1, 1, 1, 3).setFontWeight('bold').setBackground('#D4AF37').setFontColor('#000000');
    newsletterSheet.setFrozenRows(1);
  }
  
  return ss;
}

/**
 * Handle POST requests from the website
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = getOrCreateSpreadsheet();
    var type = data.type || 'enquiry';
    var timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    if (type === 'cart_enquiry') {
      var sheet = ss.getSheetByName(SHEET_NAME_ENQUIRIES);
      if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME_ENQUIRIES);
        sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Subject', 'Cart Items', 'Total Amount', 'Full Message', 'Source']);
        sheet.getRange(1, 1, 1, 9).setFontWeight('bold').setBackground('#D4AF37').setFontColor('#000000');
      }
      sheet.appendRow([
        timestamp,
        data.name || '',
        data.phone || '',
        data.email || '',
        data.subject || 'Cart Enquiry',
        data.cart_items || '',
        data.total_amount || '',
        data.message || '',
        data.source || 'website'
      ]);
    } else if (type === 'contact_form') {
      var sheet = ss.getSheetByName(SHEET_NAME_CONTACTS);
      if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME_CONTACTS);
        sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Subject', 'Message', 'Source']);
        sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#D4AF37').setFontColor('#000000');
      }
      sheet.appendRow([
        timestamp,
        data.name || '',
        data.phone || '',
        data.email || '',
        data.subject || '',
        data.message || '',
        data.source || 'website'
      ]);
    } else if (type === 'newsletter') {
      var sheet = ss.getSheetByName(SHEET_NAME_NEWSLETTER);
      if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME_NEWSLETTER);
        sheet.appendRow(['Timestamp', 'Email', 'Source']);
        sheet.getRange(1, 1, 1, 3).setFontWeight('bold').setBackground('#D4AF37').setFontColor('#000000');
      }
      sheet.appendRow([
        timestamp,
        data.email || '',
        data.source || 'website'
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ok',
    message: 'KAFF Enquiry Sheet Webhook is active. Use POST to submit data.'
  })).setMimeType(ContentService.MimeType.JSON);
}
