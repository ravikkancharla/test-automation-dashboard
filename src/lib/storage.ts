import { STORAGE_KEY } from '../constants';
import type { TestRun } from '../types';

// Storage layer - swap this out first when moving to a real backend.

export function loadRuns(): TestRun[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as TestRun[]) : [];
  } catch (e) {
    console.error('Storage read failed', e);
    return [];
  }
}

export function saveRuns(runs: TestRun[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
  } catch (e) {
    console.error('Storage write failed', e);
  }
}
