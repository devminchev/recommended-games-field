import { useEffect } from "react";
import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";

import DefaultRecommendedGames from "../components/DefaultRecommendedGames";
import { FormStyled } from "../styles/forms";

const Field = () => {
  const { window } = useSDK<FieldAppSDK>();

  useEffect(() => {
    window.startAutoResizer();

    return () => window.stopAutoResizer();
  }, [window]);

  return <FormStyled>
    <DefaultRecommendedGames />
  </FormStyled>;
};

export default Field;
