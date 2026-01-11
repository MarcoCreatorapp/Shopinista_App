import { Button, Rows, Text, Scrollable, Box } from "@canva/app-ui-kit";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { Paths } from "src/routes/paths";

/**
 * Error Page con UI nativa de Canva
 */
export const ErrorPage = () => {
  const navigate = useNavigate();
  const intl = useIntl();

  const onClick = () => {
    navigate(Paths.ENTRYPOINT);
  };

  return (
    <Scrollable>
      <Box padding="large" background="negativeLow" borderRadius="medium">
        <Rows spacing="2u" alignment="center">
          <Text tone="negative">
            <FormattedMessage
              defaultMessage="Something went wrong."
              description="A message to indicate that something went wrong, but no more information is available"
            />
          </Text>
          <Button variant="primary" onClick={onClick} stretch={true}>
            {intl.formatMessage({
              defaultMessage: "Start over",
              description:
                "A button label to clear the error and the prompt and start again",
            })}
          </Button>
        </Rows>
      </Box>
    </Scrollable>
  );
};
