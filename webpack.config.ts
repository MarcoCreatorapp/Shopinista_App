import type { Configuration } from "webpack";
import { DefinePlugin, optimize } from "webpack";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { transform } from "@formatjs/ts-transformer";
import { config } from "dotenv";
import CompressionPlugin from "compression-webpack-plugin";

config();

const backendHost = process.env.CANVA_BACKEND_HOST;

const configWebpack: Configuration = {
  mode: "production",
  context: path.resolve(process.cwd(), "./"),
  entry: { app: path.join(process.cwd(), "src", "index.tsx") },
  target: "web",
  resolve: {
    alias: {
      src: path.resolve(process.cwd(), "src"),
      components: path.resolve(process.cwd(), "src/components"),
      utils: path.resolve(process.cwd(), "src/utils"),
      context: path.resolve(process.cwd(), "src/context"),
      routes: path.resolve(process.cwd(), "src/routes"),
      pages: path.resolve(process.cwd(), "src/pages"),
      styles: path.resolve(process.cwd(), "styles"),
    },
    extensions: [".ts", ".tsx", ".js", ".css", ".svg", ".woff", ".woff2"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers() {
                return {
                  before: [
                    transform({
                      overrideIdFn: "[sha512:contenthash:base64:6]",
                    }),
                  ],
                };
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|svg|woff|woff2)$/i,
        type: "asset/inline",
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
          format: { ascii_only: true },
        },
      }),
    ],
  },
  output: {
    filename: "app.js", // único archivo requerido por Canva
    path: path.resolve(process.cwd(), "dist"),
    clean: true,
  },
  plugins: [
    new DefinePlugin({
      BACKEND_HOST: JSON.stringify(backendHost),
    }),
    new optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new CompressionPlugin({
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  performance: {
    hints: "warning",
    maxAssetSize: 300000,
    maxEntrypointSize: 300000,
  },
};

export default configWebpack;
