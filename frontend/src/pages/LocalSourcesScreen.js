import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { TransitionGroup } from "react-transition-group";
import { Transition } from "react-transition-group";

import getTranslated from "../constants";

const duration = 300;

const defaultStyle = {
  transition: `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1, transform: "scale(1.0)" },
  entered: { opacity: 1, transform: "scale(1.0)" },
  exiting: { opacity: 0, transform: "scale(0.7)" },
  exited: { opacity: 0, transform: "scale(0.7)" },
};

export default function LocalSourcesScreen(props) {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);
    props.add_line_to_queue(
      getTranslated(props.userLanguage, "AskCohort"),
      props.userLanguage
    );
  }, []);

  return (
    <React.Fragment>
      <Transition in={inProp} timeout={duration}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                width: "1.0",
                height: "100vh",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" color="inherit">
                  <Link to={"/"}>
                    <b style={{ color: "black" }}>SAQI</b>
                  </Link>
                  <Link to={"/"}>
                    <p style={{ color: "black" }}>
                      Local pollution sources in Shaheen Bagh:
                    </p>
                  </Link>
                </Typography>
              </Box>
              <Box
                sx={{
                  flexGrow: 3,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="button" fontSize={18}>
                  Dust
                </Typography>

                <Typography variant="button" fontSize={18}>
                  Construction
                </Typography>

                <Typography variant="button" fontSize={18}>
                  Vehicular Emission
                </Typography>

                <Typography variant="button" fontSize={18}>
                  Industries/Factories
                </Typography>

                <Typography variant="button" fontSize={18}>
                  Firecrackers
                </Typography>
              </Box>
            </Box>
          </div>
        )}
      </Transition>
    </React.Fragment>
  );
}
