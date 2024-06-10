import puppySearch from "../services/puppeteer";

export default async (req, res, next) => {
  const searchTerm = req.params.searchTerm;
  res.send(await puppySearch(searchTerm));
};
