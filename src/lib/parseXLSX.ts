import { createIndexedDBStorage, persist } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';
import { read, utils, type WorkBook, type WorkSheet } from 'xlsx';
import type { ProspeccaoDef } from './types';

export const key = 'idb-key-v1';

/**
 * Parse an .xlsx file and return its contents.
 * @param {unknown} content - Path to the .xlsx file.
 * @returns An object with the sheet names as keys and the sheet data as values.
 */
function parseXLSX(content: unknown, persistData = false) {
	const workbook: WorkBook = read(content, { type: 'array' });
	const result = {};

	console.log(workbook);

	workbook.SheetNames.forEach((sheetName: string) => {
		const worksheet: WorkSheet = workbook.Sheets[sheetName];
		const data: string[][] = utils.sheet_to_json(worksheet);
		console.log(utils.sheet_to_html(worksheet));

		result[sheetName] = { data };
	});

	if (persistData) {
		//@ts-expect-error asas
		persist(writable<ProspeccaoDef<'Junho'>>(result), createIndexedDBStorage(), key);
	}

	return result;
}

export default parseXLSX;
