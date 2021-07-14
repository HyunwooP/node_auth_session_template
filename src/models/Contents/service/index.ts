import * as _ from "lodash";
import {
  AppRepository,
  CommonStatusCode,
  CommonStatusMessage,
  onFailureHandler,
} from "../../../lib";
import { ContentsIE } from "../entity";

export const findOneContents = async (
  conditions: ContentsIE
): Promise<ContentsIE> => {
  try {
    return await AppRepository.Contents.findOne({
      ...conditions,
      isDeleted: false,
    });
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const findContents = async (
  conditions: ContentsIE
): Promise<ContentsIE[]> => {
  try {
    return await AppRepository.Contents.find({
      ...conditions,
      isDeleted: false,
    });
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const createContents = async (
  conditions: ContentsIE
): Promise<ContentsIE> => {
  try {
    return await AppRepository.Contents.create(conditions);
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const updateContents = async (
  conditions: ContentsIE
): Promise<ContentsIE> => {
  try {
    const contents: ContentsIE = await findOneContents({ id: conditions.id });

    if (_.isUndefined(contents)) {
      onFailureHandler({
        status: CommonStatusCode.NOT_FOUND,
        message: CommonStatusMessage.NOT_FOUND,
      });
    }

    return await AppRepository.Contents.save(conditions);
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};

export const removeContents = async (
  conditions: ContentsIE
): Promise<object> => {
  try {
    await updateContents({ id: conditions.id, isDeleted: true });
    return {};
  } catch (e) {
    onFailureHandler({
      status: e.status ?? CommonStatusCode.INTERNAL_SERVER_ERROR,
      message: e.message ?? CommonStatusMessage.INTERNAL_SERVER_ERROR,
      data: e.data ?? {},
    });
  }
};
