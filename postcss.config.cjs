const autoprefixer = require("autoprefixer");
const postcssNested = require("postcss-nested");
const postcssSimpleVars = require("postcss-simple-vars");

const colors = require("./src/ui-kit/variables/colors.json");

module.exports = {
    plugins: [
        autoprefixer,
        postcssNested,
        postcssSimpleVars({
            variables: { ...colors },
        }),
    ],
};
