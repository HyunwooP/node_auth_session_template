import { AppRepository } from "../../../lib";
import { Contents, ContentsIE } from "../entity";

export const findOneContents = async (conditions: ContentsIE) => {
  return await AppRepository.Contents.findOne(conditions);
};

export const findContents = async (conditions: ContentsIE) => {
  return await AppRepository.Contents.find(conditions);
};

export const updateContents = async (conditions: ContentsIE) => {
  const contents = new Contents();
  return await AppRepository.Contents.save(contents);
};
