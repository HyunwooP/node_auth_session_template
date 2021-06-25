import { AppRepository } from "../../../lib";
import { Contents, ContentsIE } from "../entity";

export const findOneContents = async (conditions: ContentsIE) => {
  return await AppRepository.Contents.findOne(conditions);
};

export const findContents = async (conditions: ContentsIE) => {
  return await AppRepository.Contents.find(conditions);
};

export const updateContents = async (conditions: ContentsIE) => {
  const contents: ContentsIE = new Contents();

  contents.imageLink = conditions.imageLink;
  contents.title = conditions.title;
  contents.subTitle = conditions.subTitle;

  return await AppRepository.Contents.save(contents);
};
