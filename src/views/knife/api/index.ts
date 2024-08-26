import axios from "axios";
import { projectApiData, layerKnifeApiData } from "../store/index";
// url https://pac.baoxiaohe.fun/api/v2/projects/info?id=10118767

export const getProjectsInfoApi = (id: number = 10118767) => {
  axios.get(`/api/v2/projects/info?id=${id}`).then((res) => {
    projectApiData.value = res.data.data;
    console.log("projectApiData", projectApiData.value);

    return res.data;
  });
};

export const getKnifeInfoApi = (id: number = 10118767) => {
  axios
    .get(`/api/v2/project/knife?bleed=3&export_type=project&id=${id}`)
    .then((res) => {
      layerKnifeApiData.value = res.data.data;
      console.log("layerKnifeApiData", layerKnifeApiData.value);

      return res.data;
    });
};
