import { Scrollable, Box, Text, Button, Rows } from "@canva/app-ui-kit";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Paths } from "src/routes/paths";

export const AppError = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(Paths.ENTRYPOINT);
  };

  return (
    <Scrollable>
      <Box padding="large" background="negativeLow" borderRadius="medium">
        <Rows spacing="large" alignment="center">
          <Text size="medium" weight="bold" tone="negative">
            <FormattedMessage
              defaultMessage="Ha ocurrido un error inesperado"
              description="Mensaje mostrado cuando ocurre un error inesperado"
            />
          </Text>
          <Button variant="primary" onClick={onClick} stretch={true}>
            <FormattedMessage
              defaultMessage="Volver al inicio"
              description="Botón para reiniciar la app tras un error"
            />
          </Button>
        </Rows>
      </Box>
    </Scrollable>
  );
};
