import React from "react";
import { DefaultButton, IButtonProps } from "office-ui-fabric-react";

interface IProps {
  text: string;
  accept: string;
  buttonProps: IButtonProps;
  onFileChange: (file: File) => void;
}

interface IState {}

export default class FileInput extends React.Component<IProps, IState> {
  private fileInput = React.createRef<HTMLInputElement>();

  constructor(props: IProps) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
  }

  onButtonClick() {
    if (this.fileInput.current) {
      this.fileInput.current.click();
    }
  }

  onFileInputChange() {
    console.log("change");
    if (!this.fileInput.current) {
      return;
    }

    const files = this.fileInput.current.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log("before file change");
      this.props.onFileChange(file);
    }
  }

  render() {
    return (
      <React.Fragment>
        <DefaultButton {...this.props.buttonProps} onClick={this.onButtonClick}>
          {this.props.text}
        </DefaultButton>
        <input
          ref={this.fileInput}
          type="file"
          accept={this.props.accept}
          style={{ display: "none" }}
          onChange={this.onFileInputChange}
        />
      </React.Fragment>
    );
  }
}
