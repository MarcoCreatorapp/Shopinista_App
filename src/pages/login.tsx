import {
  Scrollable,
  Rows,
  Text,
  Button,
  LoadingIndicator,
  Box,
} from "@canva/app-ui-kit";
import { useCallback, useEffect, useState } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { scope } from "src/api";
import { Paths } from "src/routes/paths";
import { useAppContext } from "../context";

export const Login = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { oauth, setAccessToken, isAuthenticated } = useAppContext();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(Paths.ENTRYPOINT);
      return;
    }
    retrieveAndSetToken();
  }, [isAuthenticated]);

  const authorize = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await oauth.requestAuthorization({ scope });
      await retrieveAndSetToken();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      setLoading(false);
    }
  }, [oauth]);

  const retrieveAndSetToken = useCallback(
    async (forceRefresh = false) => {
      try {
        const token = await oauth.getAccessToken({ forceRefresh, scope });
        setAccessToken(token);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
        setLoading(false);
      }
    },
    [oauth, setAccessToken],
  );

  return (
    <Scrollable>
      <Rows spacing="large" alignment="center">
        <Text size="large" weight="bold">
          <FormattedMessage
            defaultMessage="Inicia sesión"
            description="Título de la pantalla de login"
          />
        </Text>
        <Button variant="primary" onClick={authorize}>
          <FormattedMessage {...loginMessages.signIntoCanva} />
        </Button>
        {loading && <LoadingIndicator />}
        {error && (
          <Box padding="small" background="negativeLow" borderRadius="medium">
            <Text tone="negative">
              <FormattedMessage {...loginMessages.authorizationError} />:{" "}
              {error}
            </Text>
            <Button variant="secondary" onClick={authorize}>
              <FormattedMessage {...loginMessages.tryAgain} />
            </Button>
          </Box>
        )}
      </Rows>
    </Scrollable>
  );
};

const loginMessages = defineMessages({
  authorizationError: {
    defaultMessage: "Authorization error",
    description:
      "Title displayed when there is an error during OAuth authorization",
  },
  tryAgain: {
    defaultMessage: "Try again",
    description: "Button text to retry authorization after an error occurs",
  },
  signIntoCanva: {
    defaultMessage: "Sign into Canva",
    description: "Button text for initiating Canva authentication",
  },
});
