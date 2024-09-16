/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
      // Modify Webpack config here
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src',
            },
          },
        ],
      });
  
      return config;
    },
    reactStrictMode: false,
  };
  
  export default nextConfig;