import { defineClientConfig } from "@vuepress/client";
import ChartJS from "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/components/ChartJS";
import ECharts from "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/components/ECharts";
import CodeDemo from "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo";
import CodeTabs from "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs";
import FlowChart from "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart";
import Mermaid from "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/components/Mermaid";
import Presentation from "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation";
import "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";
import "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/styles/footnote.scss";
import "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/styles/image-mark.scss";
import Tabs from "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs";
import "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tasklist.scss";
import "E:/VitePressTest/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.84/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tex.scss";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ChartJS", ChartJS);
    app.component("ECharts", ECharts);
    app.component("CodeDemo", CodeDemo);
    app.component("CodeTabs", CodeTabs);
    app.component("FlowChart", FlowChart);
    app.component("Mermaid", Mermaid);
    app.component("Presentation", Presentation);
    app.component("Tabs", Tabs);
    
  }
});