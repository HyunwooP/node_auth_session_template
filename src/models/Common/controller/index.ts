import { RequestIE, ResponseIE } from "../../../lib";
import { _health, _findTheme } from "../service";

/**
 * @method GET
 * @param {RequestIE} req
 * @param {ResponseIE} res
 * @param {Function} next
 * @returns {Promise<object>}
 */
export const health = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<object> => {
  return await _health();
};

export const findTheme = async (
  req: RequestIE,
  res: ResponseIE,
  next: Function
): Promise<object> => {
  return await _findTheme();
};
