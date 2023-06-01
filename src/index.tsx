// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// import React from "react";
import ReactDOM from "react-dom";
import { THEME_KEYWORD, THEME_LIGHT } from "./constants";
import Root from "./Root";

const theme = localStorage.getItem(THEME_KEYWORD);
document.documentElement.setAttribute('data-theme', theme || THEME_LIGHT)
if (!theme) {
	localStorage.setItem(THEME_KEYWORD, THEME_LIGHT)
}

// const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";

// const client = new ApolloClient({
//   uri: subgraphUri,
//   cache: new InMemoryCache(),
// });

ReactDOM.render(<Root />, document.getElementById("root"));
