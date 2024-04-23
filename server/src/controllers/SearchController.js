const SearchService = require("../services/SearchService");
const { CREATED, OK } = require("../core/successResponse");
class SearchController {
  static searchLists = async (req, res, next) => {
    const lists = await SearchService.searchLists({ search: req.query.search });
    return new OK({
      message: "Search lists successfully!",
      metadata: {
        lists,
      },
    }).send(res);
  };
}

module.exports = SearchController;
