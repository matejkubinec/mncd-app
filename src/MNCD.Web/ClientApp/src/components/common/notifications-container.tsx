import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import Notifications, { show } from "react-notification-system-redux";
import NotificationSystem from "react-notification-system";

class NotificationsContainer extends React.Component<ReduxProps> {
  private style: NotificationSystem.Style = {
    NotificationItem: {
      DefaultStyle: {
        border: this.props.theme.palette.neutralDark,
        borderRadius: this.props.theme.effects.roundedCorner2,
        boxShadow: this.props.theme.effects.elevation16
      }
    }
  };

  render() {
    return (
      <Notifications
        notifications={this.props.notifications}
        style={this.style}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  theme: state.theme.current,
  notifications: state.notifications
});

const mapDispatchToProps = { show };

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(NotificationsContainer);
