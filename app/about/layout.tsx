import { FC } from "react";

type AboutLayoutProps = {
  children: React.ReactNode;
};

const AboutLayout: FC<AboutLayoutProps> = ({ children }) => {
  return <section>{children}</section>;
};

export default AboutLayout;
