import { IdentifierAndName } from "@local-types/common";

export const DEFAULT_FALLBACK_TEXT = "--";
export const DEFAULT_UNKNOWN_ERROR_TEXT =
  "An unknown error occurred. Please try refreshing the page.";
export const DEFAULT_IDENTIFIER_AND_NAME = { id: "", name: "" };
export enum UncapturedValueEnum {
  UNKNOWN = "UNKNOWN",
}
export const DEFAULT_FREE_TEXT_VALUE = "--";
export const DEFAULT_VALIDATION_MESSAGE = "Error";
export const REGEX = {
  NAME: /^[a-zA-Z][a-zA-Z0-9- ]{0,61}[a-zA-Z0-9]$/,
  NAME_NO_SPACE: /^[a-zA-Z][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$/,
  NUMBER: /^[0-9]*$/,
};

export function clearAllTimeouts(): void {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let timerIds = window.setTimeout(() => {}, 0);
  while ((timerIds -= 1)) {
    window.clearTimeout(timerIds); // will do nothing if no timeout with id is present
  }
}

// Get location query param
export function getQueryParamByKey(url: string, paramKey: string): string {
  const paramRegex = new RegExp("[?&]" + paramKey + "=([^&]+).*$");
  const value = paramRegex.exec(url);
  return !value ? "" : decodeURIComponent(value[1]);
}

// Get all query params
export function getAllQueryParams(url: string): Record<string, string> {
  const params = url.substring(1).split("&");
  const queryStringObject: Record<string, string> = {};

  params.forEach((param) => {
    const { 0: key, length, [length - 1]: value } = param.split("=");
    queryStringObject[key] = decodeURIComponent(value);
  });

  return queryStringObject;
}

// Format Dropdown Data
export function formatDropdownData<T extends IdentifierAndName>(
  data?: T[]
): { label: string; value: string }[] | [] {
  return (
    data?.map((row) => {
      return {
        label: row.name,
        value: row.id,
      };
    }) || []
  );
}

/** Format selected dropdown option */
export function formatDropdownOption<T extends IdentifierAndName>(
  data: T
): { label: string; value: string } {
  return {
    label: data.name,
    value: data.id,
    ...data,
  };
}
