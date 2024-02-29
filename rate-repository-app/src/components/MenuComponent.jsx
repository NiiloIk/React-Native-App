import { Menu, Button, Divider } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import Text from "./Text";

const MenuComponent = ({ setOrderBy, setOrderDirection }) => {
  const [visible, setVisible] = useState(true);
  const [text, setText] = useState("Latest repositories");

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const changeSelected = (selected, order) => {
    setOrderBy(selected);
    setOrderDirection(order);

    if (selected === "CREATED_AT" && order === "DESC") {
      setText("Latest repositories");
    } else if (selected === "RATING_AVERAGE" && order === "DESC") {
      setText("Highest rated repositories");
    } else {
      setText("Lowest rated repositories");
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            onPress={openMenu}
            style={{
              padding: 4,
              margin: 2,
              backgroundColor: "#2b4b8b",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>{text}</Text>
          </Button>
        }
      >
        <Menu.Item disabled={true} title="Select an item" />
        <Divider />
        <Menu.Item
          onPress={() => changeSelected("CREATED_AT", "DESC")}
          title="Latest repositories"
        />
        <Menu.Item
          onPress={() => {
            changeSelected("RATING_AVERAGE", "DESC");
          }}
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={() => {
            changeSelected("RATING_AVERAGE", "ASC");
          }}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

export default MenuComponent;
