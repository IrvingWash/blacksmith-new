const autoprefixer = require("autoprefixer");
const postcssNested = require("postcss-nested");
const postcssSimpleVars = require("postcss-simple-vars");

const colors = require("./src/ui-kit/variables/colors.json");
const sizes = require("./src/ui-kit/variables/sizes.json");

module.exports = {
    plugins: [
        autoprefixer,
        postcssNested,
        postcssSimpleVars({
            variables: { ...colors, ...sizes },
        }),
    ],
};
