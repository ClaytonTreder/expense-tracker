module.exports = {
    reactStrictMode: true,
    distDir: 'build',
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            loader: 'frontmatter-markdown-loader',
            options: { mode: ['react-component'] },
        })
        return config
    },
}
