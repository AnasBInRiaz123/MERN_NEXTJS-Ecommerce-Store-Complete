const toSlug = (str) => {
    return str
      .toLowerCase()
      .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/[^\w-]+/g, ''); // Remove non-word characters except hyphens
  };
//dev pulse studio
  module.exports = {toSlug}