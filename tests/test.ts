/**
 * Test TypeScript defs
 * (not compiled into js, only used to test def resolution)
 */
import * as XLSX from "../types";

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet([["a", "b", "c"], [1, 2, 3]]);
XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

/* generate XLSX file and send to client */
XLSX.writeFile(wb, "sheetjs.xlsx");
