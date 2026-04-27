import { FC } from "react";

type IngredientsLayoutProps = {
  children: React.ReactNode;
};

const IngredientsLayout: FC<IngredientsLayoutProps> = ({ children }) => {
  return <section>{children}</section>;
};

export default IngredientsLayout;
