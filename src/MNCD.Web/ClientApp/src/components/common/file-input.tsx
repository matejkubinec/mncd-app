import React from "react";
import { DefaultButton, IButtonProps } from "office-ui-fabric-react";

interface IProps {
  text: string;
  accept: string;
  buttonProps: IButtonProps;
  onFileChange: (file: File) => void;
}

export default class FileInput extends React.Component<IProps> {
  private fileInput = React.createRef<HTMLInputElement>();

  handleButtonClick = () => {
    if (this.fileInput.current) {
      this.fileInput.current.click();
    }
  };

  handleFileInputChange = () => {
    if (!this.fileInput.current) {
      return;
    }

    const files = this.fileInput.current.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.props.onFileChange(file);
    }
  };

  render() {
    return (
      <React.Fragment>
        <DefaultButton
          {...this.props.buttonProps}
          onClick={this.handleButtonClick}
        >
          {this.props.text}
        </DefaultButton>
        <input
          ref={this.fileInput}
          type="file"
          accept={this.props.accept}
          style={{ display: "none" }}
          onChange={this.handleFileInputChange}
        />
      </React.Fragment>
    );
  }
}
