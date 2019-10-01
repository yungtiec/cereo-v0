import { FloatingActionBtn, RotatedFloatingActionBtn } from "components";
import React from "react";
import styles from "./FloatingSider.module.scss";
import { connect } from "react-redux";
import { getOverlayStatus, toggleOverlay } from "store-launcher";
import { Row, Col } from "antd";

const FloatingSider = ({ overlayIsOpen, toggleOverlay }) => {
  return (
    <div className={styles.sider}>
      {overlayIsOpen ? (
        <Row type="flex" alignt="middle">
          <Col span={24}>
            <FloatingActionBtn icon="rollback" rotate={false} />
          </Col>
          <Col span={24}>
            <FloatingActionBtn icon="link" rotate={false} />
          </Col>
          <Col span={24}>
            <FloatingActionBtn icon="message" rotate={false} />
          </Col>
        </Row>
      ) : (
        <RotatedFloatingActionBtn
          text="leave feedback"
          onClick={toggleOverlay}
        />
      )}
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    ...ownProps,
    overlayIsOpen: getOverlayStatus(state)
  };
};

const actions = { toggleOverlay };

export default connect(
  mapState,
  actions
)(FloatingSider);
