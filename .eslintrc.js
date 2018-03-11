module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
      "strict": 0,
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-use-before-define": ["error", { "variables": false }],
      "react/no-array-index-key": ["warn"],
    }
};
