import React from "react";
import {
  Toolbar,
  Section,
  SwitchLabel,
  FAB
} from "./BottomToolbar.module.scss";
import {
  Flex,
  JustifySpaceBetween,
  AlignItemsCenter
} from "scss/flex.module.scss";
import classnames from "classnames";
import { FloatingActionBtn } from "components";
import { Switch, Icon } from "antd";

const BottomToolbar = ({
  overlayActivated,
  commentBoxIsOpen,
  toggleCommentBox,
  toggleCommentMode
}) => {
  return (
    <div
      className={classnames(
        Toolbar,
        Flex,
        JustifySpaceBetween,
        AlignItemsCenter
      )}
    >
      <div className={Section}>
        <span className={SwitchLabel}>Comment mode</span>
        <Switch
          checked={overlayActivated}
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="close" />}
          onClick={toggleCommentMode}
        />
      </div>
      <div className={Section}>
        <FloatingActionBtn icon="link" styleOverrides={FAB} />
        <FloatingActionBtn
          icon="message"
          styleOverrides={FAB}
          onClick={toggleCommentBox}
        />
        <FloatingActionBtn icon="smile" styleOverrides={FAB} />
      </div>
    </div>
  );
};

export default BottomToolbar;
