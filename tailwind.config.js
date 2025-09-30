/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色
        "main_color_1": "#00AFAF",
        "main_color_2": "#00D5D5",
        "main_color_3": "#CDEFEF",
        "main_color_4": "#E5F7F7",
        // 辅色
        "side_color_1": "#FFA940",
        // 中性色
        "neutral_color_1": "#222222",
        "neutral_color_2": "#333939",
        "neutral_color_3": "#666666",
        "neutral_color_4": "#878787",
        "neutral_color_5": "#999999",
        "neutral_color_6": "#D5D5D5",
        "neutral_color_7": "#EAEAEA",
        "neutral_color_8": "#F4F5F5",
        "neutral_color_9": "#F0F0F0",

        // :
        "common_color_1": "#D8222D",
        "common_color_2": "#E96941",
        "common_color_3": "#73B47C",
        "common_color_4": "#8AD7A9",
        "common_color_5": "#04CFCB",
        "common_color_6": "#1092FC",
        "common_color_7": "#6BA2EC",
        "common_color_8": "#977CDB",
        "common_color_9": "#FD87A2",
        "common_color_10": "#C4C4C4",

        // Desktop:
        "desktop_color_1": "#797d62",
        "desktop_color_2": "#9b9b7a",
        "desktop_color_3": "#baa587",
        "desktop_color_4": "#d9ae94",
        "desktop_color_5": "#f1dca7",
        "desktop_color_6": "#ffcb69",
        "desktop_color_7": "#e8ac65",
        "desktop_color_8": "#d08c60",
        "desktop_color_9": "#b58463",
        "desktop_color_10": "#997b66",
      },
      fontFamily: {
        "Georgia-Regular": ["Georgia-Regular"],
        "Georgia-Italic": ["Georgia-Italic"],
        "Georgia-Bold": ["Georgia-Bold"],
        "Georgia-Bold-Italic": ["Georgia-Bold-Italic"],
        "SiyuanHei-Regular": ["SiyuanHei-Regular"],
        "SiYuanHei-Bold": ["SiYuanHei-Bold"],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

