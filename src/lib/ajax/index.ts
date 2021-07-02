import axios from "axios";
import * as _ from "lodash";

const generateQueryEndPoint = (endPoint: string, params: any) => {
  let _endPoint = `${endPoint}?`;

  Object.keys(params).forEach((key: string, index: number) => {
    if (index === 0) {
      _endPoint += `${key}=${params[key]}`;
    } else {
      _endPoint += `&${key}=${params[key]}`;
    }
  });

  return _endPoint;
};

export const getAPI = async (
  endPoint: string = "",
  params = {},
  axiosOption = {}
) => {
  const getEndPoint = _.isEmpty(params)
    ? endPoint
    : generateQueryEndPoint(endPoint, params);
  const result = await axios.get(getEndPoint, axiosOption);
  return await generateAPIData(result);
};

export const deleteAPI = async (
  endPoint: string = "",
  params = {},
  axiosOption = {}
) => {
  const deleteEndPoint = _.isEmpty(params)
    ? endPoint
    : generateQueryEndPoint(endPoint, params);
  const result = await axios.delete(deleteEndPoint, axiosOption);
  return await generateAPIData(result);
};

export const postAPI = async (
  endPoint: string = "",
  data = {},
  axiosOption = {
    timeout: 2000,
  }
) => {
  const result = await axios.post(endPoint, data, axiosOption);
  return await generateAPIData(result);
};

export const putAPI = async (
  endPoint: string = "",
  data = {},
  axiosOption = {
    timeout: 2000,
  }
) => {
  const result = await axios.put(endPoint, data, axiosOption);
  return await generateAPIData(result);
};

export const patchAPI = async (
  endPoint: string = "",
  data = {},
  axiosOption = {
    timeout: 2000,
  }
) => {
  const result = await axios.patch(endPoint, data, axiosOption);
  return await generateAPIData(result);
};

export const generateAPIData = async (res: any) => {
  // 확장할 것이 있으면 여기에 작성
  return res.data;
};
