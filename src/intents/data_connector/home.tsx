import { Scrollable, Rows, Text, Box } from "@canva/app-ui-kit";
import { FormattedMessage } from "react-intl";

export const Home = () => {
  return (
    <Scrollable>
      <Box padding="medium" background="neutralLow" borderRadius="medium">
        <Rows spacing="large" alignment="center">
          <Text size="large" weight="bold">
            <FormattedMessage
              defaultMessage="Bienvenido"
              description="Título de la pantalla inicial"
            />
          </Text>
          <Text tone="secondary" size="medium">
            <FormattedMessage
              defaultMessage="Esta es la pantalla inicial de tu conector."
              description="Texto introductorio en la pantalla Home"
            />
          </Text>
        </Rows>
      </Box>
    </Scrollable>
  );
};
