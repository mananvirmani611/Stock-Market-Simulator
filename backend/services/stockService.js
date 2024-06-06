const CONSTANTS = require("../utils/constants");
const ThirdPartyAPIService = require("./thirdPartyAPIService");

const getStocksData = async (req) => {
  try {
    let url =
      CONSTANTS.THIRD_PARTY_URL.STOCK_DATA_BASE_URL +
      CONSTANTS.THIRD_PARTY_URL.GET_STOCK_DATA;

    let page_no;
    let stock_name;
    if(req.query.page_no){
        page_no = req.query.page_no;
        url += `?page_no=${page_no}`;
    }
    if(req.query.stock_name){
        stock_name = req.query.stock_name;
        url += `?stock_name=${stock_name}`;
    }

    const dataResponse = await ThirdPartyAPIService.get(url);
    return dataResponse.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getStocksData,
};
