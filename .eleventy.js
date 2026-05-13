const markdownIt = require('markdown-it');

module.exports = function(eleventyConfig) {
  const md = markdownIt({ html: true, breaks: true });

  eleventyConfig.addFilter('markdown', function(content) {
    if (!content) return '';
    return md.render(String(content));
  });

  eleventyConfig.addFilter('dateDisplay', function(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long'
    });
  });

  eleventyConfig.addCollection('posts', function(api) {
    return api.getFilteredByGlob('journal/*.md')
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('admin');

  return {
    dir: {
      input: '.',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ['njk', 'md', 'html']
  };
};
