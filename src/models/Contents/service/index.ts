import { AppRepository } from "../../../lib";
import { Contents, ContentsIE } from "../entity";

export const findOneContents = async (conditions: ContentsIE) => {
  return await AppRepository.Contents.findOne(conditions);
};

export const findContents = async (conditions: ContentsIE) => {
  return await AppRepository.Contents.find(conditions);
};

export const createContents = async (conditions: ContentsIE) => {
  const contents: ContentsIE = new Contents();

  contents.imageLink = conditions.imageLink;
  contents.title = conditions.title;
  contents.subTitle = conditions.subTitle;
  contents.description = conditions.description;

  return await AppRepository.Contents.save(contents);
};

export const updateContents = async (conditions: ContentsIE) => {
  const contents: ContentsIE = new Contents();

  contents.imageLink = conditions.imageLink;
  contents.title = conditions.title;
  contents.subTitle = conditions.subTitle;
  contents.description = conditions.description;

  return await AppRepository.Contents.save(contents);
};

export const deleteContents = async () => {
  const contents: ContentsIE = new Contents();

  contents.isDeleted = true;

  return await AppRepository.Contents.save(contents);
};
