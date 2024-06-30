import { CURRENT_YEAR, DJING_START_YEAR } from "./constants";

export function getDJingYears() {
  return CURRENT_YEAR - DJING_START_YEAR;
}
