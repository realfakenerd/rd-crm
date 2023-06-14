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

	workbook.SheetNames.forEach((sheetName: string) => {
		const worksheet: WorkSheet = workbook.Sheets[sheetName];
		const data: string[][] = utils.sheet_to_json(worksheet, { header: 1 });

		const head = data[0].map((header: string) => header.trim().toLowerCase());
		const content: Record<string, any>[] = [];

		let i = 1;
		for (i; i < data.length; i++) {
			const row: string[] = data[i];
			const rowData: Record<string, any> = {} as Record<string, any>;

			let j = 0;
			for (j; j < head.length; j++) {
				rowData[head[j]] = typeof row[j] === 'string' ? row[j].toLowerCase() : row[j];
			}

			content.push(rowData);
		}

		result[sheetName] = { head, content };
	});

	if (persistData) {
		//@ts-expect-error asas
		persist(writable<ProspeccaoDef<'Junho'>>(result), createIndexedDBStorage(), key)
	}

	return result;
}

export default parseXLSX;
