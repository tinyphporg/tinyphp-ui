
const Plugins = [
    {
        name: 'bootstrap-widget',
        test: /node_modules[\\/](bootstrap4-duallistbox|bootstrap-colorpicker|bootstrap-slider|bootstrap-switch|bs-custom-file-input|bs-custom-file-input|bs-stepper)[\\/]/,
        dest: "bootstrap4-duallistbox:双向选择框\nbootstrap-colorpicker:颜色选择器\nbs-custom-file-input:文件上传",
        enable: true,
        css: true,
        javascript: true
    },
    {
        name: 'chartjs',
        test: /node_modules[\\/](chart.js)[\\/]/,
        dest: "开源图表库",
        enable: true,
        css: true,
        javascript: true
    },
    {
        name: 'echarts',
        test: /node_modules[\\/]echarts/,
        dest: "开源图表库",
        enable: true,
        css: true,
        javascript: true
    }
]

module.exports = Plugins
