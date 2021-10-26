const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');
const path = require('path');

module.exports = (env = {}) => {

    const { mode = 'development' } = env;

    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const getStyleLoaders = () => {
        return [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
        ];
    };

    const generateHtmlPlugins = (templateDir) => {
        const templateFiles = fs.readdirSync(templateDir);
        const path = templateDir.split('/')[1];
        return templateFiles.map(item => {
            return new HtmlWebpackPlugin({
                filename: item,
                template: `${path}/views/${item}`,
                minify: false
            });
        });
    };

    const getPlugins = () => {
        const plugins = [
            // Remove dist folder
            new CleanWebpackPlugin(),
            ...generateHtmlPlugins('./public/views')
        ];
        if (isProd) {
            plugins.push(new MiniCssExtractPlugin({
                filename: 'main.css'
            }));
            plugins.push();
        }
        return plugins;
    };

    console.log(mode);
    return {
        mode: isProd ? 'production' : isDev && 'development',

        output: {
            filename: isProd ? 'main.js' : undefined
        },

        module: {
            rules: [

                // Loading JS
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },

                // Loading Images
                {
                    test: /\.(jpe?g|gif|ico)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name].[ext]'
                        }
                    }]
                },

                // Loading Images
                {
                    test: /\.(png)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name].[ext]'
                        }
                    }]
                },

                // Loading Fonts
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts',
                            name: '[name].[ext]'
                        }
                    }]
                },

                // Loading CSS
                {
                    test: /\.(css)$/,
                    use: [...getStyleLoaders(),
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ],
                            sourceMap: true
                        }
                    }
                    ]
                },

                // Loading SCSS
                {
                    test: /\.(scss)$/,
                    use: [...getStyleLoaders(), {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer()
                            ],
                            sourceMap: true
                        }
                    },
                        'sass-loader']
                },
                {
                    test: /\.html$/,
                    include: path.resolve(__dirname, "public/includes"),
                    use: ["raw-loader"],
                },
            ]
        },

        plugins: getPlugins(),

        devServer: {
            open: true,
            historyApiFallback: true
        }
    };
};