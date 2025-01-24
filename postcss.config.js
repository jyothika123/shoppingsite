module.exports = {
    plugins: [
      require('postcss-preset-env')({
        stage: 1, // Allows modern CSS features
        autoprefixer: { grid: true },
      }),
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  };