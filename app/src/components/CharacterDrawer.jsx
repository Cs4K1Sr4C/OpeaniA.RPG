import React, { useEffect, useState } from "react";
import {
  Drawer,
  RadioGroup,
  Radio,
  ButtonToolbar,
  Button,
  IconButton,
  Placeholder,
  Grid,
  Row,
  Panel,
  Col,
  Timeline,
  Progress,
  FlexboxGrid,
} from "rsuite";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleDownIcon from "@rsuite/icons/legacy/AngleDown";
import AngleUpIcon from "@rsuite/icons/legacy/AngleUp";

import { useTranslation } from "react-i18next";

const styles = {
  radioGroupLabel: {
    padding: "8px 12px",
    display: "inline-block",
    verticalAlign: "middle",
  },
};

const CharacterDrawer = ({title, character, avatarImg}) => {
  const { t } = useTranslation();
  const [size, setSize] = useState("lg");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("bottom");
  const [characterExists, setCharacterExists] = useState(false);

  const handleOpen = (key) => {
    setOpen(true);
    setPlacement(key);
  };

  return (
    <>
      <Drawer
        size={size}
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
      >
        {character && Object.keys(character).length > 0 ? (<>
            <Drawer.Header
          style={{ backgroundColor: "black", boxShadow: "0px 0px 10px black" }}
        >
          <Drawer.Title style={{ color: "white" }}>{t('CHARACTER_BUTTON')}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body style={{ backgroundColor: "black" }}>
          <Grid fluid>
            <Row className="show-grid">
              <Col xs={24} sm={24} md={8}>
                <FlexboxGrid justify="center">
                  <FlexboxGrid.Item colspan={4}>
                    <hgroup>
                      <h4>{t('PICTURE')}</h4>
                    </hgroup>
                    <Panel
                      shaded
                      bordered
                      bodyFill
                      style={{ display: "inline-block", width: 240 }}
                    >
                      <img
                        src={avatarImg}
                        height="240"
                      />
                    </Panel>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <FlexboxGrid justify="center">
                  <FlexboxGrid.Item colspan={16}>
                    <hgroup>
                      <h4>{t('STATISTICS')}</h4>
                    </hgroup>
                    <h6>{t('HEALTH')}</h6>
                    <Progress.Line
                      percent={character.health}
                      status="active"
                      strokeColor="red"
                    />
                    <h6>{t('MANA')}</h6>
                    <Progress.Line
                      percent={character.mana}
                      status="active"
                      strokeColor="blue"
                    />
                    <h6>{t('STRENGTH')}</h6>
                    <Progress.Line
                      percent={character.strength}
                      status="active"
                      strokeColor="green"
                    />
                    <h6>{t('CHARISMA')}</h6>
                    <Progress.Line
                      percent={character.charisma}
                      status="active"
                      strokeColor="yellow"
                    />
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <FlexboxGrid justify="center">
                  <FlexboxGrid.Item colspan={16}>
                    <hgroup>
                      <h4>{t('TIMELINE')}</h4>
                    </hgroup>
                    <Timeline endless>
                      <Timeline.Item>
                        Timeline #1
                      </Timeline.Item>
                      <Timeline.Item>
                        Timeline #2
                      </Timeline.Item>
                      <Timeline.Item>
                        Timeline #3
                      </Timeline.Item>
                      <Timeline.Item>
                        Timeline #4
                      </Timeline.Item>
                      <Timeline.Item>
                        Timeline #5
                      </Timeline.Item>
                    </Timeline>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </Col>
            </Row>
          </Grid>
        </Drawer.Body>
        </>) : (<></>)}
      </Drawer>
    </>
  );
};

export default CharacterDrawer;
