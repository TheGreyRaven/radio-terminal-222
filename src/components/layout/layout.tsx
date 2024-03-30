import { PropsWithChildren } from "react";

import classes from "./layout.module.css";

// eslint-disable-next-line @typescript-eslint/ban-types
const Layout = function Layout({ children }: PropsWithChildren<{}>) {
  return <div className={classes.layout}>{children}</div>;
};

export default Layout;
