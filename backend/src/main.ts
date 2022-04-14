import App from "./core/app";

const app = new App({
  appName: "nft-official-website",
  port: 10235,
  notRunServer: true,
  apiMap: {
    "/": {
      "GET": (context) => {
        context.req.method
        context.res.end("hello");
      }
    }
  }
});

app.listen();