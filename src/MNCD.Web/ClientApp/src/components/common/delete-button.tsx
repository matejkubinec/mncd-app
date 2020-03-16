import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { DefaultButton, IButtonProps } from "office-ui-fabric-react";

interface IProps {
  children: JSX.Element[] | JSX.Element;
  buttonProps: IButtonProps;
}

class DeleteButton extends React.Component<ReduxProps & IProps> {
  render() {
    return (
      <DefaultButton
        {...this.props.buttonProps}
        styles={{
          root: {
            borderColor: this.props.theme.palette.red,
            backgroundColor: this.props.theme.palette.red,
            color: this.props.theme.palette.white
          },
          rootHovered: {
            borderColor: this.props.theme.palette.redDark,
            backgroundColor: this.props.theme.palette.redDark,
            color: this.props.theme.palette.white
          }
        }}
      >
        {this.props.children}
      </DefaultButton>
    );
  }
}

const mapProps = (state: RootState) => ({
  theme: state.theme.current
});

const mapDispatch = {};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DeleteButton);
