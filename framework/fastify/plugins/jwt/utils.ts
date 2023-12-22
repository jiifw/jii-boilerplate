import moment from 'moment';

export interface ToExpirationStampOptions {
  /** No. of days to set token expiration (Defaults to 7) */
  expireAfterDays: number;
}

/** MomentJS; ATOM format */
export const DATE_FORMAT_ATOM: string = 'YYYY-MM-DDTHH:mm:ssZ';

/**
 * Get token expiration datetime stamp (ATOM)
 * @param issuedAt - Issue ATOM date
 * @param options - Additional options, see below
 */
export const toExpirationStamp = (issuedAt: Date | string, options: Partial<ToExpirationStampOptions> = {}): string => {
  return moment(issuedAt)
    .utc()
    .add(options?.expireAfterDays || 7, 'days')
    .format(DATE_FORMAT_ATOM);
};

/**
 * Get token expiration milliseconds (ATOM)
 * @param issuedAt - Issue ATOM date
 * @param ms - milliseconds
 */
export const toExpirationMs = (issuedAt: Date | string, ms: number): string => {
  return moment(issuedAt)
    .utc()
    .add(ms, 'milliseconds')
    .format(DATE_FORMAT_ATOM);
};

/**
 * Format token timestamp into date
 * @param timestamp The time stamp
 * @return formatted date
 */
export const timestampToAtom = (timestamp: number): string => {
  return moment(new Date(timestamp * 1000))
    .utc()
    .format(DATE_FORMAT_ATOM);
};

/**
 * Get current datetime in ATOM format
 * @return formatted date
 */
export const now = (): string => moment().utc().format(DATE_FORMAT_ATOM);
