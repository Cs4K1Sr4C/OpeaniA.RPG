// ReactJS
import React, { useState, useEffect, useReference } from "react";
import { useTranslation, initReactI18next } from "react-i18next";

// RSuite Components
import {
  Container,
  Header,
  Content,
  Footer,
  Form,
  ButtonToolbar,
  Button,
  Navbar,
  Panel,
  FlexboxGrid,
  Drawer,
  IconButton,
  Placeholder,
  Nav,
  SelectPicker,
  Message,
  Row,
  Col,
  Grid,
  RadioGroup,
  Radio,
} from "rsuite";

import DefaultSidebar from "./Sidebar";
import Dice from './Dice/Dice';

import i18n from "i18next";
const { Configuration, OpenAIApi } = require("openai");

const Game = () => {
  const [t] = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const handleLanguageChange = (value) => {
    const language = value;
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };
  const [apiKey, setApiKey] = useState();
  const [openaiApi, setOpenaiApi] = useState(null);
  const opeania_prompt = `You are from now a functional API server and a Dungeon & Dragons game master. You have to answer only with a JSON object, but you have to wait for the player's reaction after each step. You have to use the provided language code and translate the message property in the JSON object! The language code is: "${currentLanguage}".

To instantiate the game, ask the player in a message to click on the "Start" button then wait for the player's reaction!
Once they do, you'll prompt them to choose a name for their character using the following syntax:
'{
  "type": "name",
  "message": "Choose a name for your character:"
}'

After the player chooses their name, you can provide them with a list of races to select from using the following syntax:
'{
  "type": "race",
  "message": "Choose a race for your character:",
  "options": [
    "Human",
    "Elf",
    "Dwarf",
    "Halfling",
    "Dragonborn",
    "Gnome"
  ]
}'

Next, you can provide the player with a list of classes to select from using the following syntax:
'{
  "type": "class",
  "message": "Choose a class for your character:",
  "options": [
    "Barbarian",
    "Cleric",
    "Druid",
    "Monk",
    "Paladin",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard"
  ]
}'


Next you can provide the player with a list of game types to select from using the following syntax:
'{
  "type": "game",
  "message": "Choose a game type",
  "options": [
    "adventure",
    "survival"
  ]
}'
`;
  const [APIKEY_OK, setAPIKEY_OK] = useState(false);
  const [gameDisabled, setGameDisabled] = useState(false);
  const [gameType, setGameType] = useState();
  const [gameStage, setGameStage] = useState("initialization");
  const [loading, setLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState();
  const [systemMessageResponse, setSystemMessageResponse] = useState();
  const [userMessage, setUserMessage] = useState();
  const [userMessageResponse, setUserMessageResponse] = useState();
  const [assistantMessage, setAssistantMessage] = useState();
  const [assistantMessageResponse, setAssistantMessageResponse] = useState();
  const [messages, setMessages] = useState([
    { role: "system", content: opeania_prompt },
  ]);
  const [sceneType, setSceneType] = useState(null);
  const [text, setText] = useState("");
  const [message, setMessage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [options, setOptions] = useState([]);
  const [character, setCharacter] = useState({});
  const [health, setHealth] = useState(100);
  const [experience, setExperience] = useState(0);
  const [gold, setGold] = useState(0);
  const [level, setLevel] = useState(1);
  const [inventory, setInventory] = useState([]);
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [currentLocation, setCurrentLocation] = useState();
  const [enemies, setEnemies] = useState([]);
  const [quest, setQuest] = useState({});
  const [completedQuests, setCompletedQuests] = useState([]);
  const [activeQuests, setActiveQuests] = useState([]);
  const [partyMembers, setPartyMembers] = useState([]);
  const [map, setMap] = useState({});
  const [weather, setWeather] = useState();
  const [timeOfDay, setTimeOfDay] = useState();
  const [dayOfWeek, setDayOfWeek] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [music, setMusic] = useState("");
  const [soundEffects, setSoundEffects] = useState([]);
  const [gameOptions, setGameOptions] = useState([]);
  const [gameSettings, setGameSettings] = useState({});
  const [gameStatistics, setGameStatistics] = useState({});
  const [language, setLanguage] = useState();
  const [notifications, setNotifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [credits, setCredits] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [cutscenes, setCutscenes] = useState([]);
  const [cinematics, setCinematics] = useState([]);
  const [miniGames, setMiniGames] = useState([]);
  const [achievementsUnlocked, setAchievementsUnlocked] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [multiplayerMode, setMultiplayerMode] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [gameplaySpeed, setGameplaySpeed] = useState();
  const [gameplayDifficulty, setGameplayDifficulty] = useState();
  const [gameplayMode, setGameplayMode] = useState("story");
  const [controller, setController] = useState("mouse");
  const [virtualRealityMode, setVirtualRealityMode] = useState(false);
  const [voiceRecognition, setVoiceRecognition] = useState(false);
  const [gameEvents, setGameEvents] = useState([]);
  const [gameChallenges, setGameChallenges] = useState([]);
  const [unlockableCharacters, setUnlockableCharacters] = useState([]);
  const [bossEncounters, setBossEncounters] = useState([]);
  const [tradingCards, setTradingCards] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const initialization = async () => {
    setLoading(true);
    console.log("Initialization is in progress...");
    if (gameStage === "initialization") {
      const existingCharacter = localStorage.getItem("character");
      if (existingCharacter) {
        localStorage.clear();
        initialization();
      } else {
        const response = await openaiApi
          .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
          })
          .then((response) => {
            try {
              const responseText =
                response["data"]["choices"][0]["message"]["content"];
              setSystemMessageResponse(responseText);
              const responseJSON = JSON.parse(responseText);
              if (responseJSON["phase"] === "") {
                return initialization();
              }
              messages.push({ role: "assistant", content: responseText });
              setText(responseJSON["response_text"]);
              setMessage(responseJSON["message"]);
              setImageUrl(responseJSON["image_url"] || null);
              setOptions(responseJSON["options"] || []);
              setGameStage("initialized");
              console.log("Initialized");
              setAPIKEY_OK(true);
              setLoading(false);
              return responseJSON;
            } catch (error) {
              console.log(error);
              initialization();
            }
          });
      }
    }
  };

  useEffect(() => {
    const checkApiKeyAndInit = async () => {
      while (!openaiApi?.configuration?.apiKey) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      initialization();
    };

    if (openaiApi?.configuration?.apiKey) {
      checkApiKeyAndInit();
    }
  }, [openaiApi]);

  const initializeWithAPIKey = async (apiKey) => {
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai_ = new OpenAIApi(configuration);
    setOpenaiApi(openai_);
  };

  const chat_user = async (user_message) => {
    setLoading(true);
    messages.push({ role: "user", content: user_message });
    console.log(messages);
    const response = await openaiApi
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      })
      .then((response) => {
        try {
          const responseText =
            response["data"]["choices"][0]["message"]["content"];
          console.log(response);
          setUserMessageResponse(responseText);
          const responseJSON = JSON.parse(responseText);
          messages.push({ role: "assistant", content: responseText });
          setText(responseJSON["response_text"]);
          setMessage(responseJSON["message"] || null);
          setImageUrl(responseJSON["image_url"] || null);
          setOptions(responseJSON["options"] || []);
          setLoading(false);
          return responseJSON;
        } catch (error) {
          console.log(error);
          messages.shift();
          chat_user(user_message);
        }
      });
    console.log(messages);
  };

  const characterCreationPrompt = (character) => {
    return `Follow and extend with more 5 additional properties (spells, abilities, skills) dependently of the race and cast the following JSON object:
{
  "gameType": "${character.gameType}",
  "name": "${character.name}",
  "race": "${character.race}",
  "cast": "${character.cast}",
  "health": 100,
  "mana": number dependently of the the cast,
  "strength": number dependently of the the cast,
  "dexterity": number dependently of the the cast,
  "intelligence": number dependently of the the cast,
  "wisdom": number dependently of the the cast,
  "charisma": number dependently of the the cast,
  "inventory": [extend it with 5 random starting items],
  "abilities": [extend it with 3 random abilities],
  "skills": [extend it with 3 random skills],
  "location": "random starting location in OpeaniA"
}
  `;
  };
  const createCharacter = async (character) => {
    const response = await openaiApi.createCompletion({
      model: "text-davinci-003",
      prompt: characterCreationPrompt(character),
      temperature: 0.1,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    console.log(JSON.parse(response.data.choices[0].text));
    setCharacter(JSON.parse(response.data.choices[0].text));
    return JSON.parse(response.data.choices[0].text);
  };

  const sceneCreationPrompt = (previousSceneText, previouslyChoosedOption) => {
    return `Create a random scene by the provided previously choosen option and the previous scene's text. The previously choosen option is: "${previouslyChoosedOption}" and the previous scene's text is: "${previousSceneText}". If the previously choosen option contains the "attack", "fight" or similar to these words, then the type of the scene must to be "combat". The provided language code is: "${currentLanguage}". Respond only with a JSON object and use the following JSON object as a structure:
    {
      "type": "type of the scene (explore, combat, adventure",
      "message": "the message for the player on the language provided by the user",
      "text": "random story text dependently from the previously choosen option and on the language provided by the user",
      "options": ["minimum 5 random chooseable options dependently of the story text"]
    }`;
  };
  const createScene = async (previousSceneText, previouslyChoosedOption) => {
    setLoading(true);
    const response = await openaiApi
      .createCompletion({
        model: "text-davinci-003",
        prompt: sceneCreationPrompt(previousSceneText, previouslyChoosedOption),
        temperature: 0.7,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      })
      .then((response) => {
        try {
          console.log(JSON.parse(response.data.choices[0].text));
          const responseJSON = JSON.parse(response.data.choices[0].text);
          setSceneType(responseJSON["type"] || null);
          setText(responseJSON["text"] || null);
          setMessage(responseJSON["message"] || null);
          setOptions(responseJSON["options"] || []);
          localStorage.setItem(
            "scene",
            JSON.stringify(response.data.choices[0].text)
          );
          setLoading(false);
          return JSON.parse(response.data.choices[0].text);
        } catch (error) {
          console.log("Regeneration of the scene...");
          createScene(previousSceneText, previouslyChoosedOption);
        }
      });
  };

  const handleAPIKeyRequestForm = async (event) => {
    event.preventDefault();
    console.log(event.target.form.api_key.value);
    await initializeWithAPIKey(event.target.form.api_key.value);
  };

  const handlePlayerReaction = async (event, rolledNumber) => {
    event.preventDefault();
    if (gameStage === "initialized") {
      const response = await chat_user("start");
      setGameStage("select_name");
    } else if (gameStage === "select_name") {
      setLoading(true);
      console.log(event.target.form[0].value)
      const response = await chat_user(event.target.form[0].value);
      character.name = event.target.form[0].value;
      setGameStage("select_race");
      setLoading(false);
    } else if (gameStage === "select_race") {
      setLoading(true);
      console.log(event.target.value)
      const response = await chat_user(event.target.value);
      character.race = event.target.value;
      setGameStage("select_cast");
      setLoading(false);
    } else if (gameStage === "select_cast") {
      setLoading(true);
      console.log(event.target.value)
      const response = await chat_user(event.target.value);
      character.cast = event.target.value;
      setGameStage("select_game_type");
      setLoading(false);
    } else if (gameStage === "select_game_type") {
      setLoading(true);
      console.log(event.target.value)
      const response = await chat_user(event.target.value);
      character.gameType = event.target.value;
      const newCharacter = async (character) => {
        return await createCharacter(character);
      };
      setCharacter(newCharacter);
      setGameStage("scene");
      setLoading(false);
    } else if (gameStage === "scene") {
      console.log(sceneType);
      if (sceneType === "explore") {
        const response = await createScene(text, event.target.value);
      } else if (sceneType === "adventure") {
        const response = await createScene(text, event.target.value);
      } else if (sceneType === "combat") {
        const response = await createScene(text, event.target.value);
      } else {
        const response = await createScene(text, event.target.value);
      }
      setGameStage("scene");
    }
  };

  const DevelopeMessage = <Message
    type="warning"
    className="customMessage warning"
    style={{ height: "6rem" }}
  >
    <h5 style={{ textAlign: "center", color: "white" }}>
      {t(
        "THE_GAME_IS_UNDER_COUNTIUOUS_PLANNING_DEVELOPMENT_AND_TESTING_H3"
      )}
    </h5>
  </Message>;

  return (
    <>
      {loading ? (
        <>
          <div className="container">
            <div id="loading">
              <div id="snake"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          {!APIKEY_OK ? (
            <>
              <Container
                style={{
                  height: "100svh",
                  backgroundImage: `url(${require("./assets/castle.png")})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "100% 100%",
                  backgroundSize: "50%",
                  position: "relative",
                  zIndex: "1",
                }}
              >
                <Content>
                  <FlexboxGrid justify="center">
                    <FlexboxGrid.Item colspan={12}>
                      <Panel
                        header={
                          <h3 style={{ color: "white" }}>
                            {t("HOW_TO_AND_CONFIGURATION_H1")}
                          </h3>
                        }
                      >
                        {!DevelopeMessage}
                        <Message
                          style={{
                            backgroundImage:
                              "linear-gradient(black, #2c5a7c8a)",
                            boxShadow: "inset 0px -6px 10px black",
                            backgroundColor: "transparent",
                          }}
                          showIcon
                          type="info"
                          header={
                            <h5 style={{ color: "white" }}>
                              {t("INFORMATION_H5")}
                            </h5>
                          }
                        >
                          <h6 style={{ color: "white" }}>
                            {t("YOU_NEED_TO_CREATE")}{" "}
                            <a
                              href="https://platform.openai.com/account/api-keys"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t("OPENAI_SETTINGS_PAGE")}
                            </a>{" "}
                            {t("TO_USE_THIS_GAME")}
                          </h6>
                          <h6 style={{ color: "white" }}>
                            {t("THE_APPLICATION_IS_NOT_STORING_YOUR_API_KEY")}
                          </h6>
                          <h6 style={{ color: "white" }}>
                            {t("AFTER_ENTERED_API_KEY")}
                          </h6>
                        </Message>
                        <Form.Group controlId="radioList">
                          <RadioGroup
                            name="languageSelectRadio"
                            inline
                            appearance="picker"
                            defaultValue={currentLanguage}
                            onChange={(value) => {
                              handleLanguageChange(value);
                            }}
                          >
                            <Radio value="en">{t("English")}</Radio>
                            <Radio value="hu">{t("Hungarian")}</Radio>
                            <Radio value="fr">{t("French")}</Radio>
                            <Radio value="pt">{t("Portugees")}</Radio>
                            <Radio value="it">{t("Italian")}</Radio>
                            <Radio value="nl">{t("Dutch")}</Radio>
                            <Radio value="de">{t("German")}</Radio>
                            <Radio value="es">{t("Spanish")}</Radio>
                            <Radio value="cz">{t("Czeh")}</Radio>
                            <Radio value="kr">{t("Korean")}</Radio>
                            <Radio value="jp">{t("Japanese")}</Radio>
                          </RadioGroup>
                        </Form.Group>
                        <Form fluid>
                          <Form.Group style={{ marginTop: "2rem" }}>
                            <Form.ControlLabel>
                              <h4 style={{ color: "white" }}>
                                {t("API_KEY_LABEL_H4")}
                              </h4>
                            </Form.ControlLabel>
                            <Form.Control
                              className="customInput"
                              name="api_key"
                              disabled={gameDisabled ? true : false}
                            />
                          </Form.Group>
                          <Form.Group>
                            <ButtonToolbar>
                              <Button
                                className="optionButton"
                                appearance="primary"
                                onClick={handleAPIKeyRequestForm}
                                block
                                disabled={gameDisabled ? true : false}
                                style={{ height: "5rem" }}
                              >
                                {t("NEXT")}
                              </Button>
                            </ButtonToolbar>
                          </Form.Group>
                        </Form>
                      </Panel>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </Content>
                <img
                  src={require("./assets/frame.png")}
                  width="100%"
                  height="100%"
                  style={{
                    width: "100% !important",
                    height: "100% !important",
                    position: "fixed",
                    zIndex: "-1",
                  }}
                />
              </Container>
            </>
          ) : (
            <>
              <Header>
                <Navbar
                  appearance="inverse"
                  style={{
                    backgroundColor: "black",
                    boxShadow: "0px 0px 10px black",
                    position: "relative",
                  }}
                >
                  <Nav pullRight>
                    <Nav.Item>
                      <Button
                        style={{ backgroundColor: "red", color: "white" }}
                        onClick={() => {
                          document.location.reload();
                        }}
                      >
                        {t("RESET_GAME")}
                      </Button>
                    </Nav.Item>
                  </Nav>
                </Navbar>
              </Header>
              <div className="container">
                <img
                  id="frame"
                  src={require("./assets/frame.png")}
                  width="100%"
                  height="100%"
                />
                <img
                  id="castle"
                  src={require("./assets/castle.png")}
                  width="100%"
                  height="100%"
                />
                <img
                  id="avatar"
                  src={require("./assets/avatar.png")}
                  width="100%"
                  height="100%"
                />
              </div>
              <Container>
                <DefaultSidebar />
                <Container>
                  <Content>
                    <Panel header={<h3 style={{ textAlign: "center" }}></h3>}>
                      <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={6}>
                          <Form
                            onSubmit={(event) => handlePlayerReaction(event)}
                          >
                            {gameStage === "initialized" && (
                              <Form.Group>
                                {imageUrl ? (
                                  <>
                                    <img
                                      src={imageUrl}
                                      style={{
                                        marginLeft: "-28px",
                                        marginBottom: "1em",
                                      }}
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                                {text ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {text}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {message ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {message}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}

                                <Button
                                  appearance="primary"
                                  type="submit"
                                  className="optionButton"
                                  block
                                  style={{ marginTop: "1em" }}
                                  onClick={handlePlayerReaction}
                                >
                                  {t("Start")}
                                </Button>
                              </Form.Group>
                            )}
                            {gameStage === "select_name" && (
                              <Form.Group>
                                {imageUrl ? (
                                  <>
                                    <img
                                      src={imageUrl}
                                      style={{
                                        marginLeft: "-28px",
                                        marginBottom: "1em",
                                      }}
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                                {message ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {message}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                <Form.ControlLabel></Form.ControlLabel>
                                <Form.Control
                                  name="character_name"
                                  type="text"
                                />
                                <br />
                                <Button
                                  appearance="primary"
                                  type="submit"
                                  block
                                  className="optionButton"
                                  style={{ marginTop: "1em" }}
                                  onClick={handlePlayerReaction}
                                >
                                  {t("Confirm")}
                                </Button>
                              </Form.Group>
                            )}
                            {gameStage === "select_race" && (
                              <Form.Group>
                                {imageUrl ? (
                                  <>
                                    <img
                                      src={imageUrl}
                                      style={{
                                        marginLeft: "-28px",
                                        marginBottom: "1em",
                                      }}
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                                {text ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {text}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {message ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {message}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                <Form.ControlLabel></Form.ControlLabel>
                                {/*CastButtonGroup()*/}
                                <ButtonToolbar>
                                  {options.map((option) => (
                                    <Button
                                      key={option}
                                      value={option}
                                      block
                                      name="race"
                                      appearance="primary"
                                      className="optionButton"
                                      type="submit"
                                      style={{ marginTop: "1em" }}
                                      onClick={handlePlayerReaction}
                                    >
                                      {option}
                                    </Button>
                                  ))}
                                </ButtonToolbar>
                              </Form.Group>
                            )}
                            {gameStage === "select_cast" && (
                              <Form.Group>
                                {imageUrl ? (
                                  <>
                                    <img
                                      src={imageUrl}
                                      style={{
                                        marginLeft: "-28px",
                                        marginBottom: "1em",
                                      }}
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                                {text ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {text}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {message ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {message}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                <Form.ControlLabel></Form.ControlLabel>
                                {/*CastButtonGroup()*/}
                                <ButtonToolbar>
                                  {options.map((option) => (
                                    <Button
                                      key={option}
                                      value={option}
                                      block
                                      name="cast"
                                      appearance="primary"
                                      className="optionButton"
                                      type="submit"
                                      style={{ marginTop: "1em" }}
                                      onClick={handlePlayerReaction}
                                    >
                                      {option}
                                    </Button>
                                  ))}
                                </ButtonToolbar>
                              </Form.Group>
                            )}
                            {gameStage === "select_game_type" && (
                              <Form.Group>
                                {imageUrl ? (
                                  <>
                                    <img
                                      src={imageUrl}
                                      style={{
                                        marginLeft: "-28px",
                                        marginBottom: "1em",
                                      }}
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                                {text ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {text}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {message ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {message}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                <Form.ControlLabel></Form.ControlLabel>
                                {/*GameTypesButtonGroup()*/}
                                <ButtonToolbar>
                                  {options.map((option) => (
                                    <Button
                                      key={option}
                                      value={option}
                                      block
                                      name="gameType"
                                      className="optionButton"
                                      appearance="primary"
                                      type="submit"
                                      style={{ marginTop: "1em" }}
                                      onClick={handlePlayerReaction}
                                    >
                                      {option}
                                    </Button>
                                  ))}
                                </ButtonToolbar>
                              </Form.Group>
                            )}
                            {gameStage === "scene" && (
                              <Form.Group>
                                {imageUrl ? (
                                  <>
                                    <img
                                      src={imageUrl}
                                      style={{
                                        marginLeft: "20%",
                                        marginBottom: "1em",
                                      }}
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                                {text ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {text}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {message ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {message}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                <Form.ControlLabel></Form.ControlLabel>
                                <ButtonToolbar>
                                  {options != null && options.length != 0 ? (
                                    options.map((option) => (
                                      <Button
                                        key={option}
                                        value={option}
                                        block
                                        name="chosenOption"
                                        className="optionButton"
                                        appearance="primary"
                                        type="submit"
                                        style={{ marginTop: "1em" }}
                                        onClick={handlePlayerReaction}
                                      >
                                        {option}
                                      </Button>
                                    ))
                                  ) : (
                                    <>
                                      <Button
                                        className="optionButton"
                                        key="continue"
                                        value="continue"
                                        block
                                        appearance="primary"
                                        type="submit"
                                        style={{ marginTop: "1em" }}
                                        onClick={handlePlayerReaction}
                                      >
                                        {t("Continue")}
                                      </Button>
                                      <Dice
                                        callback={(rolledNumber) => {
                                          console.log(rolledNumber);
                                          handlePlayerReaction(rolledNumber);
                                        }}
                                      />
                                    </>
                                  )}
                                </ButtonToolbar>
                              </Form.Group>
                            )}
                            {gameStage === "combat" && (
                              <Form.Group>
                                {imageUrl ? (
                                  <>
                                    <img
                                      src={imageUrl}
                                      style={{
                                        marginLeft: "20%",
                                        marginBottom: "1em",
                                      }}
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                                {text ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {text}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {message ? (
                                  <>
                                    <Message type="info">
                                      <h4 style={{ textAlign: "center" }}>
                                        {message}
                                      </h4>
                                    </Message>
                                  </>
                                ) : (
                                  <></>
                                )}
                                <Form.ControlLabel></Form.ControlLabel>
                                <Dice
                                  callback={(rolledNumber) => {
                                    console.log(rolledNumber);
                                    handlePlayerReaction(rolledNumber);
                                  }}
                                />
                              </Form.Group>
                            )}
                          </Form>
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                    </Panel>
                  </Content>
                </Container>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Game;
